#!/usr/bin/env python3
"""
Exemplo: Como usar o pipeline de agentes programaticamente

Demonstra:
1. Rodar pipeline diretamente
2. Acessar resultados
3. Detectar erros e retries
4. Processar múltiplos itens
"""

import json
from workflows.pipeline import run_pipeline
from schemas.models import PipelineState


def exemplo_1_basico():
    """Exemplo 1: Uso básico"""
    print("\n" + "="*60)
    print("EXEMPLO 1: Uso Básico")
    print("="*60)

    result = run_pipeline(
        item_type="bean",
        item_name="Arábica Brasileira"
    )

    print(f"\n✓ Item: {result.item_name}")
    print(f"✓ Status: {result.final_status or 'em progresso'}")
    print(f"✓ Validação passou: {result.validation_feedback.passed if result.validation_feedback else 'N/A'}")


def exemplo_2_acessar_resultados():
    """Exemplo 2: Acessar resultados em detalhe"""
    print("\n" + "="*60)
    print("EXEMPLO 2: Acessar Resultados")
    print("="*60)

    result = run_pipeline("method", "V60")

    # Acessar pesquisa
    if result.research_output:
        print("\n📚 Pesquisa:")
        print(f"  Nome: {result.research_output.get('name')}")
        print(f"  Confidence: {result.research_output.get('confidence_score'):.0%}")

    # Acessar conteúdo
    if result.content_output:
        print("\n✍️  Conteúdo:")
        print(f"  Seções: {len(result.content_output.get('sections', []))}")
        for section in result.content_output.get('sections', [])[:2]:
            print(f"    • {section.get('title')}")

        # Acessar receita sugerida
        recipe = result.content_output.get('recipe', {})
        if recipe:
            print(f"\n🍳 Receita:")
            print(f"  Tempo: {recipe.get('estimated_time_minutes')} min")
            print(f"  Café: {recipe.get('beans_amount_grams')}g")
            print(f"  Água: {recipe.get('water_amount_ml')}ml")

    # Acessar quiz
    if result.content_output:
        quiz = result.content_output.get('quiz_questions', [])
        if quiz:
            print(f"\n❓ Quiz: {len(quiz)} perguntas geradas")

    # Acessar validação
    if result.validation_feedback:
        print("\n🔍 Validação:")
        print(f"  Passou: {result.validation_feedback.passed}")
        print(f"  Critérios:")
        for criterion in result.validation_feedback.criteria_results:
            status = "✅" if criterion.passed else "❌"
            print(f"    {status} {criterion.criterion}")
            if criterion.issue:
                print(f"       Problema: {criterion.issue}")


def exemplo_3_detectar_erros():
    """Exemplo 3: Tratamento de erros"""
    print("\n" + "="*60)
    print("EXEMPLO 3: Detectar Erros")
    print("="*60)

    result = run_pipeline("bean", "Teste Erro")

    if result.research_error:
        print(f"\n❌ Erro na pesquisa: {result.research_error}")

    if result.writing_error:
        print(f"\n❌ Erro na escrita: {result.writing_error}")

    if result.validation_error:
        print(f"\n❌ Erro na validação: {result.validation_error}")

    if not (result.research_error or result.writing_error or result.validation_error):
        print("\n✅ Sem erros!")


def exemplo_4_multiplos_itens():
    """Exemplo 4: Processar vários itens em batch"""
    print("\n" + "="*60)
    print("EXEMPLO 4: Processamento em Batch")
    print("="*60)

    # Lista de grãos para testar
    graos = ["Arábica", "Robusta"]

    resultados = []

    for grao in graos:
        print(f"\n🔄 Processando: {grao}...")
        result = run_pipeline("bean", grao, max_retries=2)

        resultados.append({
            "nome": result.item_name,
            "sucesso": result.validation_feedback.passed if result.validation_feedback else False,
            "retries": result.retry_count,
            "erros": [
                result.research_error,
                result.writing_error,
                result.validation_error
            ]
        })

    # Resumo
    print("\n" + "="*60)
    print("RESUMO BATCH:")
    print("="*60)

    for r in resultados:
        status = "✅" if r["sucesso"] else "❌"
        print(f"  {status} {r['nome']} (retries: {r['retries']})")


def exemplo_5_pipeline_customizado():
    """Exemplo 5: Usar agentes individualmente (customizado)"""
    print("\n" + "="*60)
    print("EXEMPLO 5: Agentes Individuais")
    print("="*60)

    import asyncio
    from agents.researcher import ResearcherAgent
    from agents.writer import WriterAgent

    async def run_individual():
        # Usar Researcher sozinho
        researcher = ResearcherAgent()
        research = await researcher.research("Bourbon", "bean")

        print(f"\n📚 Pesquisa direta:")
        print(f"  Confidence: {research.get('confidence_score'):.0%}")
        print(f"  Origin: {research.get('origin', 'N/A')}")

        # Usar Writer com essa pesquisa
        writer = WriterAgent()
        content = await writer.write_content(research, "bean")

        print(f"\n✍️  Conteúdo gerado:")
        print(f"  Seções: {len(content.get('sections', []))}")

    asyncio.run(run_individual())


def exemplo_6_salvar_resultados():
    """Exemplo 6: Salvar e carregar resultados"""
    print("\n" + "="*60)
    print("EXEMPLO 6: Persistência de Dados")
    print("="*60)

    import json
    from pathlib import Path

    result = run_pipeline("bean", "Bourbon")

    # Salvar como JSON
    output_dir = Path("output") / "bean" / "Bourbon"
    state_file = output_dir / "state.json"

    print(f"\n💾 Salvando em: {state_file}")

    if state_file.exists():
        # Carregar de volta
        with open(state_file) as f:
            loaded = json.load(f)

        print(f"✓ Carregado: {loaded.get('item_name')}")
        print(f"✓ Passou na validação: {loaded.get('validation_feedback', {}).get('passed')}")


# Main
if __name__ == "__main__":
    print("""
    ╔═══════════════════════════════════════════════════════╗
    ║  CoffeLovers AI Agents — Exemplos de Uso            ║
    ╚═══════════════════════════════════════════════════════╝

    Escolha um exemplo:
    1. Uso Básico
    2. Acessar Resultados Detalhados
    3. Detectar Erros
    4. Processamento em Batch
    5. Agentes Individuais
    6. Persistência de Dados

    Executando todos os exemplos...
    """)

    try:
        # Descomente para rodar exemplos específicos:
        # exemplo_1_basico()
        # exemplo_2_acessar_resultados()
        # exemplo_3_detectar_erros()
        # exemplo_4_multiplos_itens()
        # exemplo_5_pipeline_customizado()
        # exemplo_6_salvar_resultados()

        # Ou descomente para rodar um por vez interativamente:
        exemplos = [
            ("Básico", exemplo_1_basico),
            ("Resultados", exemplo_2_acessar_resultados),
            ("Erros", exemplo_3_detectar_erros),
        ]

        for nome, func in exemplos:
            try:
                func()
            except Exception as e:
                print(f"\n⚠️  {nome} gerou exceção: {e}")
                print("  (Isso é esperado em primeira execução se API key não estiver configurada)")

        print("\n" + "="*60)
        print("✅ Exemplos completos!")
        print("="*60 + "\n")

    except Exception as e:
        print(f"\n❌ Erro: {e}")
        print("Verifique se:")
        print("  1. ANTHROPIC_API_KEY está definida")
        print("  2. Dependências estão instaladas")
        print("  3. Você está no diretório correto")
