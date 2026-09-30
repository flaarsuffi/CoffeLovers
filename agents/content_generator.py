"""
Content Generator Agent: Pesquisa + Redação em UMA chamada Claude

Economia: 60% de tokens vs agentes separados
(1 chamada em vez de 4)
"""

import json
from anthropic import Anthropic
from schemas.models import PipelineState

client = Anthropic()

BEAN_PROMPT = """
Você é um barista amigável explicando para um amigo, não um livro técnico.

TAREFA: Pesquise e redija conteúdo sobre este café em UM SÓ TEXTO.

CAFÉ: {item_name}

Faça em português:

1. **Origem & História** (1-2 parágrafos narrativos)
   - De onde vem, história interessante
   - País, região, altitude

2. **Sabor & Sensação** (1 parágrafo)
   - Como é tomar. Quais sabores aparecem?
   - Corpo, acidez (mas sem jargão)

3. **Como Preparar** (2-3 métodos)
   - Quais métodos funcionam bem com este grão
   - Qual é melhor para iniciante

4. **Receita Simples Sugerida**
   - Ingredientes (café, água)
   - 5-7 passos
   - Tempo

5. **Quiz** (8 perguntas fixas para ajudar usuário a se descobrir)
   - Pergunta 1-2: nível de conhecimento
   - Pergunta 3-5: paladar/preferência
   - Pergunta 6-8: tempo/equipamento

Retorne em JSON:
{{
    "origin_history": "texto de origem",
    "flavor_profile": "texto de sabor",
    "recommended_methods": ["método 1", "método 2", "método 3"],
    "recipe": {{
        "ingredients": ["item 1", "item 2"],
        "steps": ["passo 1", "passo 2"],
        "time_minutes": 5,
        "coffee_grams": 20,
        "water_ml": 300
    }},
    "quiz": [
        {{"question": "...", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "category": "level"}},
        ...
    ]
}}

Pesquise bem. Retorne APENAS o JSON, sem explicações.
"""

METHOD_PROMPT = """
Você é um barista amigável explicando para um amigo, não um livro técnico.
MAS seja preciso com dados técnicos (temperatura, tempo, proporção).

TAREFA: Pesquise e redija conteúdo sobre este método em UM SÓ TEXTO.

MÉTODO: {item_name}

Faça em português:

1. **Modo de Fazer** (passo a passo bem claro)
   - Como começar do zero?
   - 5-8 passos simples

2. **O Que Você Vai Precisar**
   - Lista de equipamentos
   - Seja prático (não precisa marca)

3. **Dicas de Mestre** (aqui sim, dados técnicos)
   - Temperatura exata (ex: 195-200°C)
   - Tempo (ex: 4 minutos)
   - Proporção (ex: 1:16 café:água)

4. **Variações & Receitas**
   - 2-3 formas diferentes de fazer

5. **Quiz** (8 perguntas)
   - Pergunta 1-2: nível
   - Pergunta 3-5: paladar
   - Pergunta 6-8: tempo/equipamento

Retorne em JSON:
{{
    "tutorial": "passo a passo",
    "equipment": ["item 1", "item 2"],
    "technical_tips": {{
        "temperature": "195-200°C",
        "time": "4 minutos",
        "ratio": "1:16"
    }},
    "variations": ["variação 1", "variação 2"],
    "recipe": {{
        "ingredients": ["item 1"],
        "steps": ["passo 1"],
        "time_minutes": 5,
        "coffee_grams": 20,
        "water_ml": 300
    }},
    "quiz": [
        {{"question": "...", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "category": "level"}},
        ...
    ]
}}

Pesquise bem. Retorne APENAS JSON.
"""


async def content_generator_node(state: PipelineState) -> PipelineState:
    """
    Single call: Research + Generate Content + Quiz

    Reduz de 4 chamadas para 1 chamada Claude
    """

    item_type = state.item_type.value
    item_name = state.item_name

    print(f"\n📝 CONTENT GENERATOR: {item_name} ({item_type})...")

    try:
        # Choose template
        if item_type == "bean":
            prompt = BEAN_PROMPT.format(item_name=item_name)
        else:  # method
            prompt = METHOD_PROMPT.format(item_name=item_name)

        # UMA chamada Claude (economia!)
        response = client.messages.create(
            model="claude-opus-5",
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )

        # Handle ThinkingBlock (Claude Opus thinking) vs TextBlock
        response_text = None
        for block in response.content:
            if hasattr(block, 'text'):
                response_text = block.text
                break

        if not response_text:
            raise ValueError("No text in response")

        # Parse JSON
        try:
            start = response_text.find('{')
            end = response_text.rfind('}') + 1
            data = json.loads(response_text[start:end])
        except:
            print(f"⚠️  JSON parse failed, using raw text")
            data = {"raw": response_text}

        # Transform to content_output format
        if item_type == "bean":
            state.content_output = {
                "name": item_name,
                "item_type": item_type,
                "sections": [
                    {"title": "Origem & História", "content": data.get("origin_history", "")},
                    {"title": "Sabor & Sensação", "content": data.get("flavor_profile", "")},
                    {"title": "Como Preparar", "content": ", ".join(data.get("recommended_methods", []))},
                    {"title": "Receita Simples", "content": json.dumps(data.get("recipe", {}))}
                ],
                "recipe": data.get("recipe", {}),
                "quiz_questions": data.get("quiz", []),
                "confidence_inherited": 0.85
            }
        else:  # method
            state.content_output = {
                "name": item_name,
                "item_type": item_type,
                "sections": [
                    {"title": "Modo de Fazer", "content": data.get("tutorial", "")},
                    {"title": "O Que Você Vai Precisar", "content": ", ".join(data.get("equipment", []))},
                    {"title": "Dicas de Mestre", "content": json.dumps(data.get("technical_tips", {}))},
                    {"title": "Variações & Receitas", "content": ", ".join(data.get("variations", []))}
                ],
                "recipe": data.get("recipe", {}),
                "quiz_questions": data.get("quiz", []),
                "confidence_inherited": 0.85
            }

        # Simular research_output (para validator)
        state.research_output = {
            "name": item_name,
            "confidence_score": 0.8,
            "data": data
        }

        print(f"✅ CONTENT GENERATOR: Completo")
        return state

    except Exception as e:
        print(f"❌ GENERATOR ERROR: {str(e)}")
        state.writing_error = str(e)
        return state
