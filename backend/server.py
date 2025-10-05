from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

from models import (
    Story, StoryCreate, MathGame, MathGameCreate, LifeSkill, LifeSkillCreate,
    UserProfile, UserProfileCreate, UserProfileUpdate, ActivityProgress, 
    ProgressUpdate, LeaderboardEntry, Achievement
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="KidsLearn API", description="Educational platform for children aged 4-10")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Welcome to KidsLearn API!", "version": "1.0.0"}

# Story endpoints
@api_router.get("/stories", response_model=List[Story])
async def get_stories(
    type: Optional[str] = Query(None, description="Filter by story type"),
    age_group: Optional[str] = Query(None, description="Filter by age group")
):
    """Get all stories with optional filters"""
    query = {}
    if type:
        query["type"] = type
    if age_group:
        query["ageGroup"] = age_group
    
    stories = await db.stories.find(query).to_list(1000)
    return [Story(**story) for story in stories]

@api_router.get("/stories/{story_id}", response_model=Story)
async def get_story(story_id: str):
    """Get a specific story by ID"""
    story = await db.stories.find_one({"id": story_id})
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return Story(**story)

@api_router.post("/stories", response_model=Story)
async def create_story(story_data: StoryCreate):
    """Create a new story"""
    story = Story(**story_data.dict())
    await db.stories.insert_one(story.dict())
    return story

# Math Game endpoints
@api_router.get("/math-games", response_model=List[MathGame])
async def get_math_games(
    type: Optional[str] = Query(None, description="Filter by game type"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    age_group: Optional[str] = Query(None, description="Filter by age group")
):
    """Get all math games with optional filters"""
    query = {}
    if type:
        query["type"] = type
    if difficulty:
        query["difficulty"] = difficulty
    if age_group:
        query["ageGroup"] = age_group
    
    games = await db.math_games.find(query).to_list(1000)
    return [MathGame(**game) for game in games]

@api_router.get("/math-games/{game_id}", response_model=MathGame)
async def get_math_game(game_id: str):
    """Get a specific math game by ID"""
    game = await db.math_games.find_one({"id": game_id})
    if not game:
        raise HTTPException(status_code=404, detail="Math game not found")
    return MathGame(**game)

@api_router.post("/math-games", response_model=MathGame)
async def create_math_game(game_data: MathGameCreate):
    """Create a new math game"""
    game = MathGame(**game_data.dict())
    await db.math_games.insert_one(game.dict())
    return game

# Life Skills endpoints
@api_router.get("/life-skills", response_model=List[LifeSkill])
async def get_life_skills(
    category: Optional[str] = Query(None, description="Filter by category"),
    age_group: Optional[str] = Query(None, description="Filter by age group")
):
    """Get all life skills with optional filters"""
    query = {}
    if category:
        query["category"] = category
    if age_group:
        query["ageGroup"] = age_group
    
    skills = await db.life_skills.find(query).to_list(1000)
    return [LifeSkill(**skill) for skill in skills]

@api_router.get("/life-skills/{skill_id}", response_model=LifeSkill)
async def get_life_skill(skill_id: str):
    """Get a specific life skill by ID"""
    skill = await db.life_skills.find_one({"id": skill_id})
    if not skill:
        raise HTTPException(status_code=404, detail="Life skill not found")
    return LifeSkill(**skill)

@api_router.post("/life-skills", response_model=LifeSkill)
async def create_life_skill(skill_data: LifeSkillCreate):
    """Create a new life skill"""
    skill = LifeSkill(**skill_data.dict())
    await db.life_skills.insert_one(skill.dict())
    return skill

# User Profile endpoints
@api_router.get("/users", response_model=List[UserProfile])
async def get_users():
    """Get all user profiles"""
    users = await db.users.find().to_list(1000)
    return [UserProfile(**user) for user in users]

@api_router.get("/users/{user_id}", response_model=UserProfile)
async def get_user(user_id: str):
    """Get a specific user profile"""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserProfile(**user)

@api_router.post("/users", response_model=UserProfile)
async def create_user(user_data: UserProfileCreate):
    """Create a new user profile"""
    # Initialize achievements
    default_achievements = [
        {
            "id": "first_story",
            "title": "Story Starter",
            "description": "Read your first story!",
            "icon": "📖",
            "requirement": {"type": "stories_completed", "count": 1},
            "earned": False
        },
        {
            "id": "math_wizard",
            "title": "Math Wizard",
            "description": "Complete 5 math games!",
            "icon": "🧙‍♂️",
            "requirement": {"type": "math_games_completed", "count": 5},
            "earned": False
        },
        {
            "id": "life_master",
            "title": "Life Skills Master",
            "description": "Learn 3 life skills!",
            "icon": "⭐",
            "requirement": {"type": "life_skills_completed", "count": 3},
            "earned": False
        },
        {
            "id": "super_learner",
            "title": "Super Learner",
            "description": "Complete 10 activities total!",
            "icon": "🚀",
            "requirement": {"type": "total_activities", "count": 10},
            "earned": False
        }
    ]
    
    achievements = [Achievement(**ach) for ach in default_achievements]
    user = UserProfile(**user_data.dict(), achievements=achievements)
    await db.users.insert_one(user.dict())
    return user

@api_router.put("/users/{user_id}", response_model=UserProfile)
async def update_user(user_id: str, user_data: UserProfileUpdate):
    """Update user profile"""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = {k: v for k, v in user_data.dict().items() if v is not None}
    update_data["last_active"] = datetime.utcnow()
    
    await db.users.update_one({"id": user_id}, {"$set": update_data})
    updated_user = await db.users.find_one({"id": user_id})
    return UserProfile(**updated_user)

# Progress tracking endpoints
@api_router.post("/progress")
async def update_progress(progress_data: ProgressUpdate):
    """Update user progress for an activity"""
    user = await db.users.find_one({"id": progress_data.user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_profile = UserProfile(**user)
    
    # Find existing progress or create new
    activity_progress = None
    for progress in user_profile.progress:
        if progress.activity_id == progress_data.activity_id:
            activity_progress = progress
            break
    
    if not activity_progress:
        # Calculate total questions
        total_questions = len(progress_data.answers) if progress_data.answers else 0
        if progress_data.activity_type == "story":
            story = await db.stories.find_one({"id": progress_data.activity_id})
            if story and story.get("questions"):
                total_questions = len(story["questions"])
        elif progress_data.activity_type == "math":
            game = await db.math_games.find_one({"id": progress_data.activity_id})
            if game and game.get("exercises"):
                total_questions = len(game["exercises"])
        elif progress_data.activity_type == "lifeskill":
            skill = await db.life_skills.find_one({"id": progress_data.activity_id})
            if skill and skill.get("quiz"):
                total_questions = len(skill["quiz"])
        
        activity_progress = ActivityProgress(
            activity_id=progress_data.activity_id,
            activity_type=progress_data.activity_type,
            total_questions=total_questions
        )
        user_profile.progress.append(activity_progress)
    
    # Update progress
    activity_progress.answers = progress_data.answers
    activity_progress.completed = progress_data.completed
    
    if progress_data.completed:
        activity_progress.completed_at = datetime.utcnow()
        correct_count = sum(1 for answer in progress_data.answers if answer.correct)
        activity_progress.score = correct_count
        
        # Update user stats and points
        points_earned = correct_count * 10
        user_profile.total_points += points_earned
        
        if progress_data.activity_type == "story":
            user_profile.stories_completed += 1
        elif progress_data.activity_type == "math":
            user_profile.math_games_completed += 1
        elif progress_data.activity_type == "lifeskill":
            user_profile.life_skills_completed += 1
        
        # Check for new achievements
        await check_achievements(user_profile)
    
    user_profile.last_active = datetime.utcnow()
    await db.users.replace_one({"id": progress_data.user_id}, user_profile.dict())
    
    return {"message": "Progress updated successfully", "points_earned": points_earned if progress_data.completed else 0}

async def check_achievements(user_profile: UserProfile):
    """Check and award new achievements"""
    total_activities = user_profile.stories_completed + user_profile.math_games_completed + user_profile.life_skills_completed
    
    for achievement in user_profile.achievements:
        if not achievement.earned:
            req_type = achievement.requirement.get("type")
            req_count = achievement.requirement.get("count", 0)
            
            earned = False
            if req_type == "stories_completed" and user_profile.stories_completed >= req_count:
                earned = True
            elif req_type == "math_games_completed" and user_profile.math_games_completed >= req_count:
                earned = True
            elif req_type == "life_skills_completed" and user_profile.life_skills_completed >= req_count:
                earned = True
            elif req_type == "total_activities" and total_activities >= req_count:
                earned = True
            
            if earned:
                achievement.earned = True
                achievement.earned_at = datetime.utcnow()
                user_profile.total_points += 50  # Bonus points for achievements

@api_router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(limit: int = Query(10, ge=1, le=100)):
    """Get top users leaderboard"""
    users = await db.users.find().sort("total_points", -1).limit(limit).to_list(limit)
    
    leaderboard = []
    for user in users:
        user_profile = UserProfile(**user)
        achievements_count = sum(1 for ach in user_profile.achievements if ach.earned)
        
        entry = LeaderboardEntry(
            username=user_profile.username,
            total_points=user_profile.total_points,
            stories_completed=user_profile.stories_completed,
            math_games_completed=user_profile.math_games_completed,
            life_skills_completed=user_profile.life_skills_completed,
            achievements_count=achievements_count
        )
        leaderboard.append(entry)
    
    return leaderboard

@api_router.get("/stats")
async def get_platform_stats():
    """Get platform statistics"""
    total_users = await db.users.count_documents({})
    total_stories = await db.stories.count_documents({})
    total_math_games = await db.math_games.count_documents({})
    total_life_skills = await db.life_skills.count_documents({})
    
    # Calculate total activities completed
    users = await db.users.find().to_list(1000)
    total_activities_completed = sum(
        user.get("stories_completed", 0) + 
        user.get("math_games_completed", 0) + 
        user.get("life_skills_completed", 0) 
        for user in users
    )
    
    return {
        "total_users": total_users,
        "total_stories": total_stories,
        "total_math_games": total_math_games,
        "total_life_skills": total_life_skills,
        "total_activities_completed": total_activities_completed
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
