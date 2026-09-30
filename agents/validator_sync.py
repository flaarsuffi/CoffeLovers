"""
Validator Agent - SYNC Version (sem async)
"""

import json
from anthropic import Anthropic
from schemas.models import (
    PipelineState,
    ValidationFeedback,
    ValidatorCriterion
)

client = Anthropic()

VALIDATION_PROMPT = """Revise este conteúdo sobre café:
{content}

Responda em JSON (nada mais):
{{"passed": true, "tone_ok": true, "accuracy_ok": true, "complete_ok": true, "issues": []}}"""


def validator_node(state: PipelineState) -> PipelineState:
    """SYNC version - no async"""

    if not state.content_output or not state.research_output:
        state.validation_error = "Missing output"
        return state

    print(f"\n🔍 VALIDATOR: {state.content_output.get('name')}...")

    try:
        content_str = json.dumps(state.content_output, indent=2, ensure_ascii=False)
        prompt = VALIDATION_PROMPT.format(content=content_str)

        # ONE Claude call (sync)
        response = client.messages.create(
            model="claude-opus-5",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract text (handle ThinkingBlock)
        text = None
        for block in response.content:
            if hasattr(block, 'text'):
                text = block.text
                break

        if not text:
            raise ValueError("No text in response")

        # Parse JSON
        try:
            start = text.find('{')
            end = text.rfind('}') + 1
            data = json.loads(text[start:end])
        except json.JSONDecodeError:
            print(f"⚠️  JSON parse failed")
            data = {"passed": False, "issues": ["JSON parse error"]}

        # Build feedback
        passed = data.get("passed", False)
        issues = data.get("issues", [])

        criteria_results = [
            {
                "criterion": "tone",
                "passed": data.get("tone_ok", False),
                "issue": None
            },
            {
                "criterion": "accuracy",
                "passed": data.get("accuracy_ok", False),
                "issue": None
            },
            {
                "criterion": "completeness",
                "passed": data.get("complete_ok", False),
                "issue": None
            }
        ]

        feedback = {
            "passed": passed,
            "criteria_results": criteria_results,
            "target_agent": None if passed else "generator",
            "overall_feedback": "; ".join(issues)
        }

        state.validation_feedback = ValidationFeedback(**feedback)
        state.validation_error = None

        status = "✅ PASSED" if passed else "❌ NEEDS REVIEW"
        print(f"{status} VALIDATOR")
        return state

    except Exception as e:
        print(f"❌ VALIDATOR ERROR: {str(e)}")
        state.validation_error = str(e)
        return state


def route_validation_result(state: PipelineState) -> str:
    """Route based on validation result"""

    if not state.validation_feedback:
        return "end"

    if state.validation_feedback.passed:
        print("\n🎉 Content APPROVED!")
        return "end"

    if state.retry_count >= state.max_retries:
        print(f"\n⚠️  Max retries ({state.max_retries}) reached")
        return "end"

    state.retry_count += 1
    print(f"\n🔄 Retry {state.retry_count}: Regenerating...")
    return "generator"
