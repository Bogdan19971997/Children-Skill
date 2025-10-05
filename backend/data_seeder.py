"""
Data seeder script to populate the database with initial content
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample data - this mirrors the mock data structure
stories_data = [
    {
        "id": "1",
        "title": "The Magic Forest Adventure",
        "description": "Follow Lily as she discovers a magical forest full of talking animals and learns about friendship!",
        "type": "adventure",
        "ageGroup": "4-6",
        "duration": "5 min",
        "image": "🌳",
        "content": [
            "Once upon a time, there was a little girl named Lily who loved to explore.",
            "One sunny day, she found a path she had never seen before in her backyard.",
            "The path led to a magical forest where the trees sparkled like diamonds!",
            "Lily met a wise old owl who taught her about being kind to all creatures.",
            "She made friends with a playful rabbit and a gentle deer.",
            "From that day on, Lily visited her new friends every day and learned that friendship is the greatest magic of all!"
        ],
        "questions": [
            {
                "question": "What did Lily discover in her backyard?",
                "options": ["A new path", "A toy", "A flower", "A book"],
                "correct": 0
            },
            {
                "question": "Who taught Lily about being kind?",
                "options": ["A rabbit", "A deer", "An owl", "Her mother"],
                "correct": 2
            }
        ]
    },
    {
        "id": "2",
        "title": "Tommy's First Day at School",
        "description": "Join Tommy as he overcomes his fears and makes new friends on his first day at school.",
        "type": "educational",
        "ageGroup": "5-7",
        "duration": "6 min",
        "image": "🏫",
        "content": [
            "Tommy was nervous about his first day at school. His tummy felt funny!",
            "His mom gave him a big hug and said, 'You'll do great, Tommy!'",
            "At school, Tommy met his teacher, Mrs. Johnson, who had a warm smile.",
            "During playtime, Tommy shared his crayons with a boy named Sam.",
            "Sam became Tommy's first friend, and they played together all day.",
            "Tommy learned that being kind and sharing makes it easy to make friends!"
        ],
        "questions": [
            {
                "question": "How did Tommy feel on his first day?",
                "options": ["Happy", "Nervous", "Angry", "Sleepy"],
                "correct": 1
            }
        ]
    }
    # Add more stories as needed...
]

math_games_data = [
    {
        "id": "1",
        "title": "Number Detective",
        "description": "Find the missing numbers in fun sequences! Perfect for ages 4-6.",
        "type": "counting",
        "ageGroup": "4-6",
        "difficulty": "easy",
        "image": "🔍",
        "exercises": [
            {
                "question": "What number comes next? 1, 2, 3, ?",
                "options": ["4", "5", "6", "7"],
                "correct": 0,
                "explanation": "Great job! 4 comes after 3!"
            },
            {
                "question": "Fill in the missing number: 5, 6, ?, 8",
                "options": ["6", "7", "8", "9"],
                "correct": 1,
                "explanation": "Perfect! 7 goes between 6 and 8!"
            }
        ]
    },
    {
        "id": "2",
        "title": "Shape Safari",
        "description": "Discover different shapes in a fun jungle adventure!",
        "type": "shapes",
        "ageGroup": "4-7",
        "difficulty": "easy",
        "image": "🔺",
        "exercises": [
            {
                "question": "Which shape has 3 sides?",
                "options": ["Circle", "Square", "Triangle", "Rectangle"],
                "correct": 2,
                "explanation": "Excellent! A triangle has 3 sides and 3 corners!"
            },
            {
                "question": "What shape is a ball?",
                "options": ["Square", "Triangle", "Circle", "Rectangle"],
                "correct": 2,
                "explanation": "That's right! A ball is round like a circle!"
            }
        ]
    }
    # Add more games as needed...
]

life_skills_data = [
    {
        "id": "1",
        "title": "Traffic Light Safety",
        "description": "Learn how to cross the street safely with traffic lights!",
        "category": "safety",
        "ageGroup": "4-8",
        "image": "🚦",
        "lessons": [
            {
                "title": "Red Light Means Stop",
                "content": "When the light is red, cars must stop. We should wait on the sidewalk.",
                "activity": "Point to the red light and say 'STOP!'"
            },
            {
                "title": "Green Light Means Go",
                "content": "When the light turns green, cars can go. We should still look both ways!",
                "activity": "Look left, look right, then cross with an adult."
            }
        ],
        "quiz": [
            {
                "question": "What should you do when you see a red traffic light?",
                "options": ["Run across", "Wait and stop", "Close your eyes", "Wave at cars"],
                "correct": 1
            }
        ]
    }
    # Add more life skills as needed...
]

async def seed_database():
    """Seed the database with initial data"""
    print("🌱 Starting database seeding...")
    
    try:
        # Clear existing data (optional)
        print("🗑️ Clearing existing data...")
        await db.stories.delete_many({})
        await db.math_games.delete_many({})
        await db.life_skills.delete_many({})
        
        # Insert stories
        print("📚 Seeding stories...")
        if stories_data:
            await db.stories.insert_many(stories_data)
            print(f"✅ Inserted {len(stories_data)} stories")
        
        # Insert math games
        print("🔢 Seeding math games...")
        if math_games_data:
            await db.math_games.insert_many(math_games_data)
            print(f"✅ Inserted {len(math_games_data)} math games")
        
        # Insert life skills
        print("🌟 Seeding life skills...")
        if life_skills_data:
            await db.life_skills.insert_many(life_skills_data)
            print(f"✅ Inserted {len(life_skills_data)} life skills")
        
        print("🎉 Database seeding completed successfully!")
        
        # Print summary
        stories_count = await db.stories.count_documents({})
        games_count = await db.math_games.count_documents({})
        skills_count = await db.life_skills.count_documents({})
        
        print(f"""
📊 Database Summary:
   Stories: {stories_count}
   Math Games: {games_count}
   Life Skills: {skills_count}
   Total Activities: {stories_count + games_count + skills_count}
        """)
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())