#!/usr/bin/env python3
"""
Test setup — validates all imports and Claude API connection
"""

import sys
import os

def test_imports():
    """Test all required imports"""
    print("🧪 Testing imports...\n")

    try:
        print("  ✓ anthropic...", end="")
        from anthropic import Anthropic
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    try:
        print("  ✓ langgraph...", end="")
        from langgraph.graph import StateGraph
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    try:
        print("  ✓ pydantic...", end="")
        from pydantic import BaseModel
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    try:
        print("  ✓ schemas.models...", end="")
        from schemas.models import PipelineState, BeanResearchOutput
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    try:
        print("  ✓ agents...", end="")
        from agents import ResearcherAgent, WriterAgent, ValidatorAgent
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    try:
        print("  ✓ workflows.pipeline...", end="")
        from workflows.pipeline import create_pipeline, run_pipeline
        print(" OK")
    except ImportError as e:
        print(f" FAIL: {e}")
        return False

    print("\n✅ All imports OK!\n")
    return True


def test_api_connection():
    """Test Claude API connection"""
    print("🔗 Testing Claude API connection...\n")

    api_key = os.getenv("ANTHROPIC_API_KEY")

    if not api_key:
        print("  ❌ ANTHROPIC_API_KEY not set!")
        print("  Set it with: export ANTHROPIC_API_KEY='sk-ant-...'")
        return False

    try:
        from anthropic import Anthropic
        client = Anthropic()

        print("  Sending test message to Claude...", end="")
        response = client.messages.create(
            model="claude-opus-5",
            max_tokens=50,
            messages=[
                {"role": "user", "content": "Say 'oi' in one word"}
            ]
        )
        print(" ✓")
        print(f"  Response: {response.content[0].text}\n")
        print("✅ Claude API working!\n")
        return True

    except Exception as e:
        print(f" FAIL: {e}\n")
        return False


def test_state_creation():
    """Test creating pipeline state"""
    print("📦 Testing state creation...\n")

    try:
        from schemas.models import PipelineState, ContentItemType

        state = PipelineState(
            item_type=ContentItemType.BEAN,
            item_name="Test Bean"
        )

        print(f"  Created state for: {state.item_name}")
        print(f"  Type: {state.item_type.value}")
        print(f"  Max retries: {state.max_retries}")
        print("\n✅ State creation OK!\n")
        return True

    except Exception as e:
        print(f"❌ Error: {e}\n")
        return False


def main():
    print("""
    ╔════════════════════════════════════════════╗
    ║   CoffeLovers AI Agents — Setup Test      ║
    ╚════════════════════════════════════════════╝
    """)

    results = []

    results.append(("Imports", test_imports()))
    results.append(("API Connection", test_api_connection()))
    results.append(("State Creation", test_state_creation()))

    print("╔════════════════════════════════════════════╗")
    print("║   SUMMARY                                  ║")
    print("╚════════════════════════════════════════════╝\n")

    all_passed = True
    for name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"  {status}: {name}")
        if not passed:
            all_passed = False

    print()
    if all_passed:
        print("🎉 All tests passed! Ready to run pipeline.\n")
        print("Next: python main.py --type bean --name 'Arábica Brasileira'\n")
        return 0
    else:
        print("⚠️  Some tests failed. Please fix errors above.\n")
        return 1


if __name__ == "__main__":
    sys.exit(main())
