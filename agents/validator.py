"""
Validator Agent: Validates content quality against 5 criteria.

Checks:
1. TONE: Casual, no excessive jargon
2. FACTUAL_ACCURACY: Compare with research sources
3. COMPLETENESS: All template sections filled
4. GRAMMAR: Portuguese orthography and grammar
5. ACCESSIBILITY: Understandable for beginners

Returns: Pass/Fail + specific feedback + which agent should fix
"""

import json
from typing import Dict, List, Optional
from anthropic import Anthropic
from schemas.models import (
    PipelineState,
    ValidationFeedback,
    CriterionResult,
    ValidatorCriterion
)

client = Anthropic()

VALIDATION_PROMPT = """
Você é um revisor de qualidade para um site de café.
Valide este conteúdo contra 5 critérios de qualidade.

CONTEÚDO A VALIDAR:
{content}

PESQUISA ORIGINAL:
{research}

Revise CADA UM desses 5 critérios e retorne um JSON com seu parecer.

CRITÉRIOS:

1. **TONE (tom casual, sem jargão)**: O texto soa como um barista amigável? Ou é muito técnico/formal?
2. **FACTUAL_ACCURACY (precisão factual)**: As informações no texto correspondem à pesquisa original?
3. **COMPLETENESS (completude)**: Todas as seções obrigatórias estão preenchidas? Nada falta?
4. **GRAMMAR (gramática/ortografia)**: O português está correto? Sem erros de digitação?
5. **ACCESSIBILITY (acessibilidade)**: Um iniciante consegue entender? Ou é muito complexo?

Para CADA critério, retorne:
- passed: true/false
- issue: (se falhou) qual foi o problema específico?
- suggestion: (se falhou) como corrigir?
- severity: "low" / "medium" / "high"

JSON STRUCTURE:
{{
    "passed": true/false,  # ALL criteria must be true to pass
    "criteria_results": [
        {{
            "criterion": "tone",
            "passed": true/false,
            "issue": "...",
            "suggestion": "...",
            "severity": "low/medium/high"
        }},
        ...
    ],
    "target_agent": null/("researcher"/"writer"),  # Who should fix if failed?
    "overall_feedback": "..."
}}

Regras importantes:
- Se falha no TONE ou COMPLETENESS: target_agent = "writer"
- Se falha em FACTUAL_ACCURACY: target_agent = "researcher"
- Se falha em GRAMMAR ou ACCESSIBILITY: target_agent = "writer"
- Se PASSOU em tudo: target_agent = null

Responda APENAS com o JSON, sem explicações extras.
"""


class ValidatorAgent:
    """
    Validator agent that checks content quality.
    """

    def __init__(self, strict_mode: bool = False):
        """
        Args:
            strict_mode: If True, fails on even minor issues
        """
        self.strict_mode = strict_mode

    async def validate(
        self,
        content_output: Dict,
        research_output: Dict
    ) -> Dict:
        """
        Validate content against 5 criteria.

        Args:
            content_output: Output from writer agent
            research_output: Output from researcher agent

        Returns:
            ValidationFeedback dict
        """

        print(f"\n🔍 VALIDATOR: Checking {content_output.get('name', 'unknown')}...")

        try:
            # Format for validation
            content_str = json.dumps(content_output, indent=2, ensure_ascii=False)
            research_str = json.dumps(research_output, indent=2, ensure_ascii=False)

            prompt = VALIDATION_PROMPT.format(
                content=content_str,
                research=research_str
            )

            # Call Claude to validate
            response = client.messages.create(
                model="claude-opus-5",
                max_tokens=2000,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            # Handle ThinkingBlock vs TextBlock
            validation_text = None
            for block in response.content:
                if hasattr(block, 'text'):
                    validation_text = block.text
                    break

            if not validation_text:
                raise ValueError("No text in validation response")

            # Parse JSON response
            try:
                start = validation_text.find('{')
                end = validation_text.rfind('}') + 1
                validation_json = json.loads(validation_text[start:end])
            except:
                print(f"⚠️  Could not parse validation JSON")
                validation_json = {
                    "passed": False,
                    "criteria_results": [],
                    "overall_feedback": validation_text
                }

            # Build ValidationFeedback
            criteria_results = []
            all_passed = True
            target_agent = None

            for criterion_data in validation_json.get("criteria_results", []):
                passed = criterion_data.get("passed", False)

                if not passed:
                    all_passed = False
                    # Determine which agent should fix
                    criterion_name = criterion_data.get("criterion", "")
                    if criterion_name in ["tone", "completeness", "grammar", "accessibility"]:
                        target_agent = "writer"
                    elif criterion_name == "factual_accuracy":
                        target_agent = "researcher"

                criteria_results.append({
                    "criterion": criterion_data.get("criterion", "unknown"),
                    "passed": passed,
                    "issue": criterion_data.get("issue"),
                    "suggestion": criterion_data.get("suggestion"),
                    "severity": criterion_data.get("severity", "medium")
                })

            feedback = {
                "passed": all_passed,
                "criteria_results": criteria_results,
                "target_agent": target_agent if not all_passed else None,
                "overall_feedback": validation_json.get("overall_feedback", "")
            }

            status = "✅ PASSED" if all_passed else "❌ FAILED"
            print(f"{status} VALIDATOR: {len(criteria_results)} criteria checked")

            return feedback

        except Exception as e:
            print(f"❌ VALIDATOR ERROR: {str(e)}")
            return {
                "passed": False,
                "criteria_results": [],
                "error": str(e)
            }

    def _print_feedback(self, feedback: Dict) -> None:
        """Pretty print validation feedback"""
        if feedback.get("passed"):
            print("\n✅ Content APPROVED!")
        else:
            print("\n❌ Content needs revision:")
            for result in feedback.get("criteria_results", []):
                if not result.get("passed"):
                    print(f"  • {result.get('criterion')}: {result.get('issue')}")
                    if result.get('suggestion'):
                        print(f"    → {result.get('suggestion')}")


# LangGraph Node Function + Routing
async def validator_node(state: PipelineState) -> PipelineState:
    """
    LangGraph node function for validator agent.
    """

    if not state.content_output or not state.research_output:
        state.validation_error = "Missing content or research output"
        return state

    agent = ValidatorAgent()

    try:
        feedback = await agent.validate(
            state.content_output,
            state.research_output
        )

        state.validation_feedback = ValidationFeedback(**feedback)
        state.validation_error = None

    except Exception as e:
        state.validation_error = str(e)
        print(f"❌ Validator node error: {str(e)}")

    return state


def route_validation_result(state: PipelineState) -> str:
    """
    LangGraph routing function: decide next step based on validation.

    Returns:
        "end" if validation passed
        "writer" if writer needs to fix
        "researcher" if researcher needs to fix
    """

    if not state.validation_feedback:
        return "end"

    if state.validation_feedback.passed:
        print("\n🎉 Pipeline complete! Content approved.")
        return "end"

    # Max retries check
    if state.retry_count >= state.max_retries:
        print(f"\n⚠️  Max retries ({state.max_retries}) reached. Escalating to manual review.")
        return "end"

    # Route to appropriate agent
    target = state.validation_feedback.target_agent

    if target == "writer":
        state.retry_count += 1
        print(f"\n🔄 Retry {state.retry_count}: Sending back to WRITER")
        return "writer"
    elif target == "researcher":
        state.retry_count += 1
        print(f"\n🔄 Retry {state.retry_count}: Sending back to RESEARCHER")
        return "researcher"
    else:
        return "end"
