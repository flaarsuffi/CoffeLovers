#!/usr/bin/env python3
"""
CoffeLovers AI Content Pipeline
Main entry point to run the agent pipeline.

Usage:
    python main.py --type bean --name "Arábica Brasileira"
    python main.py --type method --name "V60"
"""

import argparse
import json
import os
from pathlib import Path
from workflows.pipeline import run_pipeline


def save_results(state_dict: dict, item_type: str, item_name: str) -> str:
    """Save pipeline results to file"""

    # Create output directory
    output_dir = Path("output") / item_type / item_name.replace(" ", "_")
    output_dir.mkdir(parents=True, exist_ok=True)

    # Save full state
    state_file = output_dir / "state.json"
    with open(state_file, "w", encoding="utf-8") as f:
        json.dump(state_dict, f, indent=2, ensure_ascii=False)

    # Save content separately (if approved)
    if state_dict.get("content_output"):
        content_file = output_dir / "content.json"
        with open(content_file, "w", encoding="utf-8") as f:
            json.dump(state_dict["content_output"], f, indent=2, ensure_ascii=False)

    # Save research
    if state_dict.get("research_output"):
        research_file = output_dir / "research.json"
        with open(research_file, "w", encoding="utf-8") as f:
            json.dump(state_dict["research_output"], f, indent=2, ensure_ascii=False)

    # Save validation feedback
    if state_dict.get("validation_feedback"):
        feedback_file = output_dir / "validation.json"
        with open(feedback_file, "w", encoding="utf-8") as f:
            json.dump(state_dict["validation_feedback"], f, indent=2, ensure_ascii=False)

    return str(output_dir)


def main():
    parser = argparse.ArgumentParser(
        description="CoffeLovers AI Content Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --type bean --name "Arábica Brasileira"
  python main.py --type method --name "V60"
  python main.py --type bean --name "Robusta" --retries 5
        """
    )

    parser.add_argument(
        "--type",
        choices=["bean", "method"],
        required=True,
        help="Type of item to process"
    )

    parser.add_argument(
        "--name",
        required=True,
        help="Name of the bean or method"
    )

    parser.add_argument(
        "--retries",
        type=int,
        default=3,
        help="Maximum number of validation retries (default: 3)"
    )

    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Print detailed output"
    )

    args = parser.parse_args()

    print(f"""
    ☕ CoffeLovers AI Content Pipeline
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Processing: {args.name}
    Type: {args.type}
    Max retries: {args.retries}
    """)

    # Run pipeline
    final_state = run_pipeline(
        item_type=args.type,
        item_name=args.name,
        max_retries=args.retries
    )

    # Save results
    output_path = save_results(
        final_state.dict(),
        args.type,
        args.name
    )

    print(f"\n📁 Results saved to: {output_path}")

    # Print quick summary
    print(f"\n{'='*60}")
    if final_state.validation_feedback and final_state.validation_feedback.passed:
        print("✅ SUCCESS: Content approved and ready!")
    else:
        print("⚠️  Review needed:")
        if final_state.validation_feedback:
            for result in final_state.validation_feedback.criteria_results:
                if not result.passed:
                    print(f"   • {result.criterion}: {result.issue}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
