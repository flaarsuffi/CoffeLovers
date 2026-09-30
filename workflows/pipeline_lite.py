"""
LangGraph Pipeline Lite - Versão Otimizada para Custo

Fluxo:
- Content Generator (pesquisa + redação em 1 chamada)
- Validator (qualidade)
- Feedback loop até passar (max 3 retries)

Economia: ~60% de custo vs. versão completa
"""

from langgraph.graph import StateGraph
from schemas.models import PipelineState, ContentItemType
from agents.content_generator import content_generator_node
from agents.validator import validator_node, route_validation_result


def create_pipeline_lite():
    """Lightweight pipeline: 1 generation call + 1 validation call per item"""

    workflow = StateGraph(PipelineState)

    # Two nodes only
    workflow.add_node("generator", content_generator_node)
    workflow.add_node("validator", validator_node)

    # Flow
    workflow.set_entry_point("generator")
    workflow.add_edge("generator", "validator")

    # Conditional: if validation fails, retry generator (max 3x)
    workflow.add_conditional_edges(
        "validator",
        route_validation_result,
        {
            "end": "__end__",
            "writer": "generator",  # Back to generator (writer doesn't exist in lite)
            "researcher": "generator"  # Back to generator
        }
    )

    return workflow.compile()


async def run_pipeline_lite_async(item_type: str, item_name: str, max_retries: int = 3) -> PipelineState:
    """Run lite pipeline (async)"""

    print(f"\n{'='*60}")
    print(f"🚀 PIPELINE LITE: {item_type.upper()} - {item_name}")
    print(f"{'='*60}\n")

    app = create_pipeline_lite()

    initial_state = PipelineState(
        item_type=ContentItemType.BEAN if item_type == "bean" else ContentItemType.METHOD,
        item_name=item_name,
        max_retries=max_retries
    )

    result = await app.ainvoke(initial_state.dict())
    final_state = PipelineState(**result)

    print_summary(final_state)

    return final_state


def run_pipeline_lite(item_type: str, item_name: str, max_retries: int = 3) -> PipelineState:
    """Run lite pipeline (sync wrapper)"""
    import asyncio
    return asyncio.run(run_pipeline_lite_async(item_type, item_name, max_retries))


def print_summary(state: PipelineState) -> None:
    """Print summary"""

    print(f"\n{'='*60}")
    print("📊 RESULTADO:")
    print(f"{'='*60}")

    print(f"  Item: {state.item_name}")
    print(f"  Retries: {state.retry_count}/{state.max_retries}")

    if state.content_output:
        print(f"  ✅ Conteúdo: Gerado")
        print(f"     Seções: {len(state.content_output.get('sections', []))}")
        print(f"     Quiz: {len(state.content_output.get('quiz_questions', []))} perguntas")

    if state.validation_feedback:
        if state.validation_feedback.passed:
            print(f"  ✅ Validação: APROVADO!")
        else:
            print(f"  ⏳ Validação: Precisa revisão")
            for result in state.validation_feedback.criteria_results:
                if not result.passed:
                    print(f"     ❌ {result.criterion}")

    print(f"\n{'='*60}\n")


if __name__ == "__main__":
    # Test
    result = run_pipeline_lite("bean", "Arábica Brasileira")
    print(f"Final: {result.validation_feedback.passed if result.validation_feedback else 'N/A'}")
