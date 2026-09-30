"""
Web search helper for researching coffee beans and methods.
Uses Claude to analyze search results and extract relevant information.
"""

import httpx
import asyncio
from typing import List, Dict
from anthropic import Anthropic

client = Anthropic()

# Key sources for coffee research (Brazilian + International)
COFFEE_SOURCES = {
    # Brazilian sources
    "abic": "https://www.abic.com.br",  # Brazilian Coffee Industry Association
    "scae": "https://scae.com.br",  # Specialty Coffee Association of Brazil

    # International sources
    "sca_global": "https://sca.coffee",  # Specialty Coffee Association
    "coffeegeek": "https://www.coffeegeek.com",  # Coffee reviews and guides
    "blueottercoffee": "https://www.blueottercoffee.com",  # Brewing guides
    "sprudge": "https://sprudge.com",  # Coffee news
    "homegrounds": "https://www.homegrounds.co",  # Home brewing guides
    "javapresse": "https://www.javapresse.com",  # Coffee guides
    "perfectdailygrind": "https://perfectdailygrind.com",  # Coffee education
}

async def search_coffee_info(query: str, item_type: str = "bean") -> Dict:
    """
    Search for coffee information using Claude to query multiple sources.

    Args:
        query: Search query (e.g., "Arábica Brasileira" or "V60 brewing")
        item_type: "bean" or "method"

    Returns:
        Dict with search results and confidence score
    """

    # Create a context about what we're looking for
    if item_type == "bean":
        research_prompt = f"""
        Pesquise informações sobre o café: {query}

        Procure por:
        1. ORIGEM: País, região, altitude (se disponível)
        2. PERFIL DE SABOR: Notas de sabor, corpo, acidez
        3. MÉTODOS RECOMENDADOS: Quais métodos de preparo funcionam bem

        Forneça as informações em português, de forma clara e concisa.
        Cite as fontes quando possível.
        """
    else:  # method
        research_prompt = f"""
        Pesquise informações sobre o método de preparo: {query}

        Procure por:
        1. TUTORIAL: Passo a passo de como fazer
        2. EQUIPAMENTOS: O que você precisa
        3. DICAS TÉCNICAS: Temperatura, tempo, proporcionalidade
        4. VARIAÇÕES: Outras formas de fazer

        Forneça as informações em português, de forma clara e concisa.
        Cite as fontes quando possível.
        """

    # Use Claude to gather information
    response = client.messages.create(
        model="claude-opus-5",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": research_prompt
            }
        ]
    )

    research_content = response.content[0].text

    return {
        "query": query,
        "item_type": item_type,
        "raw_research": research_content,
        "model_used": "claude-3-5-sonnet",
    }


async def extract_structured_data(raw_research: str, item_type: str) -> Dict:
    """
    Parse raw research into structured fields.
    Uses Claude to extract and organize information.
    """

    if item_type == "bean":
        extraction_prompt = f"""
        Analise o texto de pesquisa abaixo e extraia EXATAMENTE esses campos em português.

        Texto:
        {raw_research}

        Extraia e retorne em formato JSON:
        {{
            "origin": "país, região, altitude",
            "flavor_profile": "notas de sabor, corpo, acidez em uma descrição",
            "recommended_methods": ["método 1", "método 2", "método 3"]
        }}

        Se alguma informação não estiver disponível, use "Não especificado".
        Retorne APENAS o JSON, sem explicações extras.
        """
    else:  # method
        extraction_prompt = f"""
        Analise o texto de pesquisa abaixo e extraia EXATAMENTE esses campos em português.

        Texto:
        {raw_research}

        Extraia e retorne em formato JSON:
        {{
            "tutorial_steps": ["passo 1", "passo 2", ..., "passo n"],
            "equipment_needed": ["equipamento 1", "equipamento 2"],
            "technical_tips": {{
                "temperature": "X-Y°C",
                "time": "X minutos",
                "ratio": "X:Y (café:água)"
            }},
            "variations": ["variação 1", "variação 2"]
        }}

        Se alguma informação não estiver disponível, omita ou use "Não especificado".
        Retorne APENAS o JSON, sem explicações extras.
        """

    response = client.messages.create(
        model="claude-opus-5",
        max_tokens=1500,
        messages=[
            {
                "role": "user",
                "content": extraction_prompt
            }
        ]
    )

    extracted_text = response.content[0].text

    # Try to parse JSON
    import json
    try:
        # Find JSON in the response
        start = extracted_text.find('{')
        end = extracted_text.rfind('}') + 1
        json_str = extracted_text[start:end]
        parsed = json.loads(json_str)
        return parsed
    except:
        # If parsing fails, return raw
        return {"raw": extracted_text, "parse_error": "Could not parse JSON"}


async def research_coffee_item(item_name: str, item_type: str) -> Dict:
    """
    Complete research workflow: search -> extract -> structure
    """

    print(f"🔍 Pesquisando: {item_name} ({item_type})...")

    # Step 1: Search
    search_result = await search_coffee_info(item_name, item_type)

    # Step 2: Extract structured data
    structured = await extract_structured_data(
        search_result["raw_research"],
        item_type
    )

    return {
        "item_name": item_name,
        "item_type": item_type,
        "raw_research": search_result["raw_research"],
        "structured": structured,
        "confidence_score": 0.8  # Default confidence
    }


# Example usage
if __name__ == "__main__":
    result = asyncio.run(research_coffee_item("Arábica Brasileira", "bean"))
    print(result)
