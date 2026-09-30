"""
FINAL Pipeline - SYNC Version (sem async problems!)

Fluxo:
- Content Generator (pesquisa + redação em 1 chamada)
- Validator (qualidade)
- Retry loop (max 3x)

Tudo síncrono, sem async issues
"""

from langgraph.graph import StateGraph
from schemas.models import PipelineState, ContentItemType
from agents.content_generator_sync import content_generator_node
from agents.validator_sync import validator_node, route_validation_result


def create_pipeline_final():
    """Final working pipeline - SYNC only"""

    workflow = StateGraph(PipelineState)

    # Two nodes
    workflow.add_node("generator", content_generator_node)
    workflow.add_node("validator", validator_node)

    # Flow
    workflow.set_entry_point("generator")
    workflow.add_edge("generator", "validator")

    # Conditional: retry or end
    workflow.add_conditional_edges(
        "validator",
        route_validation_result,
        {
            "end": "__end__",
            "generator": "generator"
        }
    )

    return workflow.compile()


def run_pipeline_final(item_type: str, item_name: str, max_retries: int = 3) -> PipelineState:
    """Run final pipeline (sync, no async problems)"""

    print(f"\n{'='*60}")
    print(f"🚀 PIPELINE FINAL: {item_type.upper()} - {item_name}")
    print(f"{'='*60}\n")

    app = create_pipeline_final()

    initial_state = PipelineState(
        item_type=ContentItemType.BEAN if item_type == "bean" else ContentItemType.METHOD,
        item_name=item_name,
        max_retries=max_retries
    )

    # SYNC invoke - no async!
    result = app.invoke(initial_state.dict())
    final_state = PipelineState(**result)

    print_summary(final_state)

    return final_state


def print_summary(state: PipelineState) -> None:
    """Print summary"""

    print(f"\n{'='*60}")
    print("📊 RESULTADO:")
    print(f"{'='*60}\n")

    print(f"  Item: {state.item_name}")
    print(f"  Retries: {state.retry_count}/{state.max_retries}")

    if state.content_output:
        print(f"  ✅ Conteúdo gerado")

    if state.validation_feedback:
        if state.validation_feedback.passed:
            print(f"  ✅ Validação: APROVADO!")
        else:
            print(f"  ⏳ Validação: Precisa revisão")
            for result in state.validation_feedback.criteria_results:
                mark = "✅" if result.passed else "❌"
                print(f"     {mark} {result.criterion}")

    print(f"\n{'='*60}\n")


if __name__ == "__main__":
    result = run_pipeline_final("bean", "Arábica")
