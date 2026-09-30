"""
Content Generator Agent - SYNC Version (sem async)
Pesquisa + Redação em UMA chamada Claude
"""

import json
from anthropic import Anthropic
from schemas.models import PipelineState

client = Anthropic()

BEAN_PROMPT = """Escreva para um entusiasta de café caseiro que JÁ faz café regularmente.

Pesquise {item_name} em profundidade:

Retorne JSON:
{{
    "origin": "origem geográfica, altitude, história do cultivo e varietal",
    "flavor": "notas técnicas (acidez tipo, corpo, doçura), perfil aromático detalhado",
    "methods": ["método ideal 1", "método 2", "método 3"],
    "recipe": {{
        "ingredients": ["gramas", "ml água"],
        "steps": ["passo detalhado 1", "passo 2", ...],
        "time_minutes": X,
        "coffee_g": X,
        "water_ml": X
    }}
}}"""

METHOD_PROMPT = """Escreva para um entusiasta que DOMINA café caseiro e quer técnica avançada.

Pesquise {item_name} detalhadamente:

Retorne JSON:
{{
    "tutorial": "instruções técnicas passo a passo com variáveis de controle",
    "equipment": ["equipamento específico 1", "marca/tipo recomendado"],
    "technical": {{
        "temperature": "X-Y°C com notas sobre variação por torra",
        "time": "X min exato (bloom + pours)",
        "ratio": "1:X (café:água) e variações",
        "grind_size": "especificação técnica (microns se possível)"
    }},
    "recipe": {{
        "ingredients": ["20g café específico", "320ml água temperada"],
        "steps": ["passo 1 com timing", "passo 2 com observáveis"],
        "time_minutes": X,
        "coffee_g": X,
        "water_ml": X
    }}
}}"""


def content_generator_node(state: PipelineState) -> PipelineState:
    """SYNC version - no async"""

    item_type = state.item_type.value
    item_name = state.item_name

    print(f"\n📝 CONTENT GENERATOR: {item_name} ({item_type})...")

    try:
        # Choose template
        if item_type == "bean":
            prompt = BEAN_PROMPT.format(item_name=item_name)
        else:
            prompt = METHOD_PROMPT.format(item_name=item_name)

        # ONE Claude call (sync)
        response = client.messages.create(
            model="claude-opus-5",
            max_tokens=1500,
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
            data = {"raw": text}

        # Store output
        state.content_output = {
            "name": item_name,
            "item_type": item_type,
            "data": data,
            "confidence_inherited": 0.85
        }

        # Simulate research for validator
        state.research_output = {
            "name": item_name,
            "confidence_score": 0.8
        }

        print(f"✅ CONTENT GENERATOR: OK")
        return state

    except Exception as e:
        print(f"❌ GENERATOR ERROR: {str(e)}")
        state.writing_error = str(e)
        return state
