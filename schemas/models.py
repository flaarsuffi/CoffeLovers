from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from enum import Enum

# ============================================================================
# RESEARCH OUTPUT MODELS
# ============================================================================

class SourceInfo(BaseModel):
    url: str
    title: str
    excerpt: str
    relevance: float = Field(default=0.8, ge=0, le=1)

class BeanResearchOutput(BaseModel):
    """Output from Researcher Agent for a coffee bean"""
    name: str
    origin: str = Field(description="Country, region, altitude info")
    flavor_profile: str = Field(description="Tasting notes, body, acidity")
    recommended_methods: List[str] = Field(description="3 method names")
    sources_used: List[SourceInfo]
    confidence_score: float = Field(default=0.8, ge=0, le=1, description="Overall confidence (0-1)")

class MethodResearchOutput(BaseModel):
    """Output from Researcher Agent for a brewing method"""
    name: str
    tutorial_steps: List[str] = Field(description="5-8 step-by-step instructions")
    equipment_needed: List[str]
    technical_tips: Dict[str, str] = Field(description="Keys: temperature, time, ratio, etc")
    variations: List[str] = Field(description="2-3 different ways to brew")
    sources_used: List[SourceInfo]
    confidence_score: float = Field(default=0.8, ge=0, le=1)

# ============================================================================
# WRITER OUTPUT MODELS
# ============================================================================

class ContentSection(BaseModel):
    title: str
    content: str
    confidence_inherited: float = Field(description="Inherited from research")

class RecipeSuggestion(BaseModel):
    ingredients: List[str]
    steps: List[str]
    estimated_time_minutes: int
    beans_amount_grams: int
    water_amount_ml: int

class QuizQuestion(BaseModel):
    question: str
    options: List[str]  # A, B, C, D
    category: str  # "level", "taste", "time"
    explanation: Optional[str] = None

class BeanContentOutput(BaseModel):
    """Output from Writer Agent for a bean page"""
    bean_name: str
    sections: List[ContentSection] = Field(description="Origem/História, Sabor, Como Preparar, Receita")
    recipe_suggestion: RecipeSuggestion
    sources_confidence: float  # Inherited from research

class MethodContentOutput(BaseModel):
    """Output from Writer Agent for a method page"""
    method_name: str
    sections: List[ContentSection] = Field(description="Tutorial, Equipamentos, Dicas Técnicas, Variações")
    recipe_suggestion: RecipeSuggestion  # One example recipe
    sources_confidence: float

# ============================================================================
# VALIDATOR OUTPUT MODELS
# ============================================================================

class ValidatorCriterion(Enum):
    TONE = "tone"
    FACTUAL_ACCURACY = "factual_accuracy"
    COMPLETENESS = "completeness"
    GRAMMAR = "grammar"
    ACCESSIBILITY = "accessibility"

class CriterionResult(BaseModel):
    criterion: ValidatorCriterion
    passed: bool
    issue: Optional[str] = None  # What went wrong?
    suggestion: Optional[str] = None  # How to fix it?
    severity: str = Field(default="medium")  # low, medium, high

class ValidationFeedback(BaseModel):
    """Output from Validator Agent"""
    passed: bool  # ALL criteria must pass
    criteria_results: List[CriterionResult]
    target_agent: Optional[str] = None  # "researcher", "writer", or None if OK
    retry_count: int = 0

# ============================================================================
# PIPELINE STATE
# ============================================================================

class ContentItemType(str, Enum):
    BEAN = "bean"
    METHOD = "method"

class PipelineState(BaseModel):
    """Shared state throughout the pipeline"""
    item_type: ContentItemType
    item_name: str

    # Research phase
    research_output: Optional[Dict] = None  # BeanResearchOutput or MethodResearchOutput
    research_error: Optional[str] = None

    # Writing phase
    content_output: Optional[Dict] = None  # BeanContentOutput or MethodContentOutput
    writing_error: Optional[str] = None

    # Validation phase
    validation_feedback: Optional[ValidationFeedback] = None
    validation_error: Optional[str] = None

    # Tracking
    retry_count: int = 0
    max_retries: int = 3
    final_status: Optional[str] = None  # "approved", "rejected", "in_progress"
