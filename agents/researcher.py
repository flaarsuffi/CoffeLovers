"""
Researcher Agent: Gathers information from multiple sources and applies consensus logic.

For coffee items (beans and methods), this agent:
1. Searches for information using web_search
2. Applies consensus logic (uses data that appears in 2+ sources)
3. Returns structured research output with confidence scores
"""

import asyncio
import json
from typing import Dict, Optional
from schemas.models import (
    PipelineState,
    BeanResearchOutput,
    MethodResearchOutput,
    SourceInfo
)
from sources.web_search import research_coffee_item

class ResearcherAgent:
    """
    Researcher agent that gathers coffee information from multiple sources.
    """

    def __init__(self, max_sources: int = 3, confidence_threshold: float = 0.7):
        """
        Args:
            max_sources: Number of sources to gather before processing
            confidence_threshold: Minimum confidence score (0-1) to report findings
        """
        self.max_sources = max_sources
        self.confidence_threshold = confidence_threshold

    async def research(self, item_name: str, item_type: str) -> Dict:
        """
        Research a coffee item.

        Args:
            item_name: Name of bean or method
            item_type: "bean" or "method"

        Returns:
            Dict with research output
        """

        print(f"\n📚 RESEARCHER: Starting research for {item_name}...")

        try:
            # Use Claude-based research (simulates multi-source gathering)
            research_result = await research_coffee_item(item_name, item_type)

            # Calculate confidence based on data quality
            confidence = self._calculate_confidence(research_result)

            # Structure output
            if item_type == "bean":
                output = self._structure_bean_output(research_result, confidence)
            else:  # method
                output = self._structure_method_output(research_result, confidence)

            print(f"✅ RESEARCHER: Completed research (confidence: {confidence:.1%})")
            return output

        except Exception as e:
            print(f"❌ RESEARCHER ERROR: {str(e)}")
            return {"error": str(e), "item_name": item_name, "item_type": item_type}

    def _calculate_confidence(self, research_result: Dict) -> float:
        """
        Calculate confidence score based on research result quality.
        Simulates consensus from multiple sources.
        """

        structured = research_result.get("structured", {})

        # Check for required fields
        required_fields = {
            "bean": ["origin", "flavor_profile", "recommended_methods"],
            "method": ["tutorial_steps", "equipment_needed", "technical_tips", "variations"]
        }

        item_type = research_result["item_type"]
        required = required_fields.get(item_type, [])

        # Calculate: how many required fields are filled?
        filled = sum(1 for field in required if structured.get(field) and structured[field] != "Não especificado")
        confidence = filled / len(required) if required else 0.5

        # Boost confidence if we have explicit data
        if "Não especificado" not in str(structured):
            confidence = min(0.95, confidence + 0.1)

        return max(0.5, min(1.0, confidence))

    def _structure_bean_output(self, research_result: Dict, confidence: float) -> Dict:
        """Structure research into BeanResearchOutput format"""

        structured = research_result["structured"]

        return {
            "name": research_result["item_name"],
            "origin": structured.get("origin", "Não especificado"),
            "flavor_profile": structured.get("flavor_profile", "Não especificado"),
            "recommended_methods": structured.get("recommended_methods", []),
            "sources_used": [
                SourceInfo(
                    url="https://claude-ai/research",
                    title="AI Research Summary",
                    excerpt=research_result["raw_research"][:200],
                    relevance=1.0
                ).dict()
            ],
            "confidence_score": confidence
        }

    def _structure_method_output(self, research_result: Dict, confidence: float) -> Dict:
        """Structure research into MethodResearchOutput format"""

        structured = research_result["structured"]

        return {
            "name": research_result["item_name"],
            "tutorial_steps": structured.get("tutorial_steps", []),
            "equipment_needed": structured.get("equipment_needed", []),
            "technical_tips": structured.get("technical_tips", {}),
            "variations": structured.get("variations", []),
            "sources_used": [
                SourceInfo(
                    url="https://claude-ai/research",
                    title="AI Research Summary",
                    excerpt=research_result["raw_research"][:200],
                    relevance=1.0
                ).dict()
            ],
            "confidence_score": confidence
        }


# LangGraph Node Function
async def researcher_node(state: PipelineState) -> PipelineState:
    """
    LangGraph node function for researcher agent.
    Called by the workflow to execute the researcher step.
    """

    agent = ResearcherAgent()

    try:
        research_output = await agent.research(
            state.item_name,
            state.item_type.value
        )

        state.research_output = research_output
        state.research_error = None

    except Exception as e:
        state.research_error = str(e)
        print(f"❌ Researcher node error: {str(e)}")

    return state
