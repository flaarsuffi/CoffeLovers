"""
LangGraph Pipeline Orchestration for CoffeLovers Agents

Connects:
- Researcher → Writer → Validator
- Validator feedback loop (retry to Writer or Researcher if needed)

Usage:
    app = create_pipeline()
    result = app.invoke({
        "item_type": "bean",
        "item_name": "Arábica Brasileira"
    })
"""

from langgraph.graph import StateGraph
from schemas.models import PipelineState, ContentItemType
from agents.researcher import researcher_node
from agents.writer import writer_node
from agents.validator import validator_node, route_validation_result


def create_pipeline():
    """
    Create the LangGraph workflow for the coffee content pipeline.

    Graph structure:

    START
      ↓
    RESEARCHER (gather info)
      ↓
    WRITER (create content)
      ↓
    VALIDATOR (check quality)
      ├─ PASS → END
      └─ FAIL → route to WRITER or RESEARCHER (max 3 retries)

    Returns:
        Compiled LangGraph app
    """

    # Create the state graph
    workflow = StateGraph(PipelineState)

    # Add nodes (async functions work directly in LangGraph 0.2+)
    workflow.add_node("researcher", researcher_node)
    workflow.add_node("writer", writer_node)
    workflow.add_node("validator", validator_node)

    # Add edges
    workflow.set_entry_point("researcher")
    workflow.add_edge("researcher", "writer")  # Always: researcher → writer
    workflow.add_edge("writer", "validator")   # Always: writer → validator

    # Conditional edge from validator (feedback loop or end)
    workflow.add_conditional_edges(
        "validator",
        route_validation_result,
        {
            "end": "__end__",
            "writer": "writer",
            "researcher": "researcher"
        }
    )

    # Compile the graph
    app = workflow.compile()

    return app


async def run_pipeline_async(item_type: str, item_name: str, max_retries: int = 3) -> dict:
    """
    Run the complete pipeline for a single coffee item (async).

    Args:
        item_type: "bean" or "method"
        item_name: Name of the bean or method
        max_retries: Maximum number of validation retries

    Returns:
        Final pipeline state (with results or errors)
    """

    print(f"\n{'='*60}")
    print(f"🚀 STARTING PIPELINE: {item_type.upper()} - {item_name}")
    print(f"{'='*60}")

    # Create pipeline
    app = create_pipeline()

    # Initialize state
    initial_state = PipelineState(
        item_type=ContentItemType.BEAN if item_type == "bean" else ContentItemType.METHOD,
        item_name=item_name,
        max_retries=max_retries
    )

    # Run async
    result = await app.ainvoke(initial_state.dict())

    # Parse result back to PipelineState
    final_state = PipelineState(**result)

    print(f"\n{'='*60}")
    print_summary(final_state)
    print(f"{'='*60}\n")

    return final_state


def run_pipeline(item_type: str, item_name: str, max_retries: int = 3) -> dict:
    """
    Run the complete pipeline for a single coffee item (sync wrapper).
    """
    import asyncio
    return asyncio.run(run_pipeline_async(item_type, item_name, max_retries))


def print_summary(state: PipelineState) -> None:
    """Print a summary of the pipeline execution"""

    print("\n📊 PIPELINE SUMMARY:")
    print(f"  Item: {state.item_name} ({state.item_type.value})")
    print(f"  Status: {state.final_status or 'in progress'}")
    print(f"  Retries: {state.retry_count}/{state.max_retries}")

    if state.research_output:
        print(f"  ✅ Research: Complete")
        if isinstance(state.research_output, dict):
            confidence = state.research_output.get("confidence_score", 0)
            print(f"     Confidence: {confidence:.0%}")
    elif state.research_error:
        print(f"  ❌ Research: ERROR - {state.research_error}")

    if state.content_output:
        print(f"  ✅ Content: Generated")
        sections = state.content_output.get("sections", [])
        print(f"     Sections: {len(sections)}")
    elif state.writing_error:
        print(f"  ❌ Writing: ERROR - {state.writing_error}")

    if state.validation_feedback:
        status = "✅ APPROVED" if state.validation_feedback.passed else "❌ NEEDS REVIEW"
        print(f"  Validation: {status}")
        for result in state.validation_feedback.criteria_results:
            mark = "✅" if result.passed else "❌"
            print(f"    {mark} {result.criterion}")


# Example usage
if __name__ == "__main__":
    # Test with a bean
    print("\nTesting with Arábica Brasileira (bean)...")
    result = run_pipeline("bean", "Arábica Brasileira", max_retries=3)

    # Test with a method
    print("\nTesting with V60 (method)...")
    result = run_pipeline("method", "V60", max_retries=3)
