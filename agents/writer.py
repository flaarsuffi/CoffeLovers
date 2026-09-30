"""
Writer Agent: Transforms raw research into website content with casual, friendly tone.

Takes research output and:
1. Applies content templates
2. Transforms to casual Portuguese tone
3. Generates quiz questions
4. Creates suggested recipe
"""

import json
from typing import Dict, List
from anthropic import Anthropic
from schemas.models import (
    PipelineState,
    ContentSection,
    RecipeSuggestion,
    QuizQuestion
)

client = Anthropic()

BEAN_TEMPLATE = """
Você é um barista amigável explicando para um amigo, não um livro técnico.
Use linguagem casual, sem jargão excessivo.

Transforme essa pesquisa sobre café em conteúdo para o website.

PESQUISA BRUTA:
{research}

Estruture o conteúdo em EXATAMENTE essas seções (em português):

1. **Origem & História**: Conte a história de onde o café vem. Seja narrativo, não técnico.
2. **Sabor & Sensação**: Descreva como é tomar esse café. O que você sente? Quais sabores aparecem?
3. **Como Preparar**: Fale sobre os métodos recomendados. Qual é melhor para iniciante?
4. **Receita Simples Sugerida**: Uma receita bem simples (ingredientes, passos, tempo)

Retorne um JSON com essa estrutura:
{{
    "sections": [
        {{"title": "Origem & História", "content": "..."}},
        {{"title": "Sabor & Sensação", "content": "..."}},
        {{"title": "Como Preparar", "content": "..."}},
        {{"title": "Receita Simples Sugerida", "content": "..."}}
    ],
    "recipe": {{
        "ingredients": ["...", "..."],
        "steps": ["...", "..."],
        "estimated_time_minutes": X,
        "beans_amount_grams": X,
        "water_amount_ml": X
    }}
}}

Responda APENAS com o JSON, sem explicações extras.
"""

METHOD_TEMPLATE = """
Você é um barista amigável explicando para um amigo, não um livro técnico.
Use linguagem casual, sem jargão excessivo. Mas SIM, seja preciso com dados técnicos (temperatura, tempo).

Transforme essa pesquisa sobre método de preparo em conteúdo para o website.

PESQUISA BRUTA:
{research}

Estruture o conteúdo em EXATAMENTE essas seções (em português):

1. **Modo de Fazer**: Passo a passo bem claro. Como começar do zero?
2. **O Que Você Vai Precisar**: Lista de equipamentos. Seja prático (não precisa marca específica).
3. **Dicas de Mestre**: Aqui sim, seja técnico. Temperatura, tempo, proporção. Esses números importam.
4. **Variações & Receitas**: Formas diferentes de fazer. Deixe criativo.

Retorne um JSON com essa estrutura:
{{
    "sections": [
        {{"title": "Modo de Fazer", "content": "..."}},
        {{"title": "O Que Você Vai Precisar", "content": "..."}},
        {{"title": "Dicas de Mestre", "content": "..."}},
        {{"title": "Variações & Receitas", "content": "..."}}
    ],
    "recipe": {{
        "ingredients": ["...", "..."],
        "steps": ["...", "..."],
        "estimated_time_minutes": X,
        "beans_amount_grams": X,
        "water_amount_ml": X
    }}
}}

Responda APENAS com o JSON, sem explicações extras.
"""

QUIZ_PROMPT = """
Com base nessa pesquisa sobre café, gere 8 perguntas de quiz para ajudar iniciantes.

PESQUISA:
{research}

As 8 perguntas devem cobrir:
- Nível de conhecimento (1-2 perguntas)
- Paladar/preferência (2-3 perguntas)
- Tempo disponível (1-2 perguntas)
- Equipamento disponível (1-2 perguntas)

Retorne um JSON APENAS:
{{
    "questions": [
        {{
            "question": "...",
            "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
            "category": "level"  # ou "taste" ou "time" ou "equipment"
        }},
        ...
    ]
}}

Responda APENAS com o JSON, sem explicações extras.
"""


class WriterAgent:
    """
    Writer agent that transforms research into website content.
    """

    def __init__(self, tone: str = "casual"):
        """
        Args:
            tone: "casual" (padrão) ou "formal"
        """
        self.tone = tone

    async def write_content(self, research_output: Dict, item_type: str) -> Dict:
        """
        Transform research into structured content.

        Args:
            research_output: Output from researcher agent
            item_type: "bean" or "method"

        Returns:
            Dict with content sections and metadata
        """

        print(f"\n✍️  WRITER: Writing content for {research_output.get('name', 'unknown')}...")

        try:
            # Format research for templates
            research_str = json.dumps(research_output, indent=2, ensure_ascii=False)

            # Generate sections
            if item_type == "bean":
                template = BEAN_TEMPLATE.format(research=research_str)
            else:  # method
                template = METHOD_TEMPLATE.format(research=research_str)

            # Call Claude to write content
            response = client.messages.create(
                model="claude-opus-5",
                max_tokens=2500,
                messages=[
                    {"role": "user", "content": template}
                ]
            )

            content_text = response.content[0].text

            # Parse JSON response
            try:
                start = content_text.find('{')
                end = content_text.rfind('}') + 1
                content_json = json.loads(content_text[start:end])
            except:
                print(f"⚠️  Could not parse content JSON, using raw text")
                content_json = {"raw": content_text}

            # Generate quiz (8 perguntas)
            quiz_response = client.messages.create(
                model="claude-opus-5",
                max_tokens=1500,
                messages=[
                    {"role": "user", "content": QUIZ_PROMPT.format(research=research_str)}
                ]
            )

            quiz_text = quiz_response.content[0].text

            try:
                start = quiz_text.find('{')
                end = quiz_text.rfind('}') + 1
                quiz_json = json.loads(quiz_text[start:end])
            except:
                quiz_json = {"raw": quiz_text}

            result = {
                "name": research_output.get("name", "unknown"),
                "item_type": item_type,
                "sections": content_json.get("sections", []),
                "recipe": content_json.get("recipe", {}),
                "quiz_questions": quiz_json.get("questions", []),
                "confidence_inherited": research_output.get("confidence_score", 0.8)
            }

            print(f"✅ WRITER: Content written ({len(result.get('sections', []))} sections)")
            return result

        except Exception as e:
            print(f"❌ WRITER ERROR: {str(e)}")
            return {"error": str(e), "name": research_output.get("name", "unknown")}

    def _create_content_sections(self, parsed: Dict) -> List[Dict]:
        """Convert parsed sections to ContentSection objects"""
        sections = []
        for section in parsed.get("sections", []):
            sections.append({
                "title": section.get("title", ""),
                "content": section.get("content", ""),
                "confidence_inherited": parsed.get("confidence", 0.8)
            })
        return sections


# LangGraph Node Function
async def writer_node(state: PipelineState) -> PipelineState:
    """
    LangGraph node function for writer agent.
    """

    if not state.research_output:
        state.writing_error = "No research output available"
        return state

    agent = WriterAgent()

    try:
        content_output = await agent.write_content(
            state.research_output,
            state.item_type.value
        )

        state.content_output = content_output
        state.writing_error = None

    except Exception as e:
        state.writing_error = str(e)
        print(f"❌ Writer node error: {str(e)}")

    return state
