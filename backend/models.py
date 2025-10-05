from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

# Story Models
class StoryQuestion(BaseModel):
    question: str
    options: List[str]
    correct: int

class StoryInteraction(BaseModel):
    type: str  # "count", "choice", etc.
    question: str
    answer: Optional[Any] = None
    options: Optional[List[str]] = None

class Story(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    type: str  # "adventure", "educational", "interactive"
    ageGroup: str
    duration: str
    image: str
    content: List[str]
    questions: Optional[List[StoryQuestion]] = None
    interactions: Optional[List[StoryInteraction]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StoryCreate(BaseModel):
    title: str
    description: str
    type: str
    ageGroup: str
    duration: str
    image: str
    content: List[str]
    questions: Optional[List[StoryQuestion]] = None
    interactions: Optional[List[StoryInteraction]] = None

# Math Game Models
class MathExercise(BaseModel):
    question: str
    options: List[str]
    correct: int
    explanation: str

class MathGame(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    type: str  # "counting", "shapes", "addition", etc.
    ageGroup: str
    difficulty: str  # "easy", "medium", "hard"
    image: str
    exercises: List[MathExercise]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MathGameCreate(BaseModel):
    title: str
    description: str
    type: str
    ageGroup: str
    difficulty: str
    image: str
    exercises: List[MathExercise]

# Life Skills Models
class LifeSkillLesson(BaseModel):
    title: str
    content: str
    activity: Optional[str] = None

class LifeSkillQuiz(BaseModel):
    question: str
    options: List[str]
    correct: int

class LifeSkill(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str  # "safety", "social", "health"
    ageGroup: str
    image: str
    lessons: List[LifeSkillLesson]
    quiz: Optional[List[LifeSkillQuiz]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class LifeSkillCreate(BaseModel):
    title: str
    description: str
    category: str
    ageGroup: str
    image: str
    lessons: List[LifeSkillLesson]
    quiz: Optional[List[LifeSkillQuiz]] = None

# User Progress Models
class UserAnswer(BaseModel):
    question_index: int
    selected_answer: int
    correct: bool
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ActivityProgress(BaseModel):
    activity_id: str
    activity_type: str  # "story", "math", "lifeskill"
    completed: bool = False
    score: Optional[int] = None
    total_questions: Optional[int] = None
    answers: List[UserAnswer] = []
    completed_at: Optional[datetime] = None
    started_at: datetime = Field(default_factory=datetime.utcnow)

class Achievement(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    requirement: Dict[str, Any]  # {"type": "stories_completed", "count": 5}
    earned: bool = False
    earned_at: Optional[datetime] = None

class UserProfile(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    age: Optional[int] = None
    avatar: Optional[str] = "🌟"
    total_points: int = 0
    stories_completed: int = 0
    math_games_completed: int = 0
    life_skills_completed: int = 0
    progress: List[ActivityProgress] = []
    achievements: List[Achievement] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_active: datetime = Field(default_factory=datetime.utcnow)

class UserProfileCreate(BaseModel):
    username: str
    age: Optional[int] = None
    avatar: Optional[str] = "🌟"

class UserProfileUpdate(BaseModel):
    username: Optional[str] = None
    age: Optional[int] = None
    avatar: Optional[str] = None

# Progress Update Models
class ProgressUpdate(BaseModel):
    user_id: str
    activity_id: str
    activity_type: str
    answers: List[UserAnswer] = []
    completed: bool = False

class LeaderboardEntry(BaseModel):
    username: str
    total_points: int
    stories_completed: int
    math_games_completed: int
    life_skills_completed: int
    achievements_count: int