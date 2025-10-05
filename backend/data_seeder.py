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

# Comprehensive sample data from the frontend mock
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
    },
    {
        "id": "3",
        "title": "The Counting Caterpillar",
        "description": "Help Chester the Caterpillar count his way through the garden while learning numbers 1-10!",
        "type": "interactive",
        "ageGroup": "4-6",
        "duration": "4 min",
        "image": "🐛",
        "content": [
            "Chester the Caterpillar loved to munch on leaves in the garden.",
            "He ate 1 leaf for breakfast. Munch, munch!",
            "Then he found 2 more leaves by the roses.",
            "By the pond, he discovered 3 beautiful lily pad leaves.",
            "Chester counted all his leaves: 1, 2, 3, 4, 5, 6!",
            "He was so full and happy that he took a nap under a sunflower!"
        ],
        "interactions": [
            {
                "type": "count",
                "question": "How many leaves did Chester eat by the roses?",
                "answer": 2
            },
            {
                "type": "count", 
                "question": "Count all the leaves Chester ate. How many total?",
                "answer": 6
            }
        ]
    },
    {
        "id": "4",
        "title": "The Brave Little Mouse",
        "description": "Meet Max the mouse who learns that being brave doesn't mean you're never scared!",
        "type": "adventure",
        "ageGroup": "4-7",
        "duration": "7 min",
        "image": "🐭",
        "content": [
            "Max was the smallest mouse in his family, and he was afraid of many things.",
            "One day, his little sister got stuck behind a big box in the kitchen.",
            "Even though Max was scared, he knew he had to help his sister.",
            "He took a deep breath and squeezed through the small space to reach her.",
            "Max helped his sister climb out safely, and everyone cheered!",
            "Max learned that being brave means doing the right thing even when you're scared."
        ],
        "questions": [
            {
                "question": "What happened to Max's sister?",
                "options": ["She got lost", "She got stuck", "She got hurt", "She got hungry"],
                "correct": 1
            },
            {
                "question": "What did Max learn about being brave?",
                "options": ["Never be scared", "Hide from problems", "Help others even when scared", "Run away fast"],
                "correct": 2
            }
        ]
    },
    {
        "id": "5",
        "title": "The Rainbow Garden",
        "description": "Learn about colors and emotions with Emma as she plants a magical rainbow garden!",
        "type": "educational",
        "ageGroup": "4-6",
        "duration": "5 min",
        "image": "🌈",
        "content": [
            "Emma loved colors and wanted to plant a special garden with every color of the rainbow.",
            "She planted red roses because red makes us feel strong and excited.",
            "Orange marigolds went next - orange makes us feel happy and energetic!",
            "Yellow sunflowers were planted third - yellow is like sunshine and makes us cheerful.",
            "Green herbs filled the middle - green makes us feel calm and peaceful.",
            "Blue forget-me-nots and purple lavender completed her beautiful rainbow garden!"
        ],
        "questions": [
            {
                "question": "What color makes us feel calm and peaceful?",
                "options": ["Red", "Yellow", "Green", "Purple"],
                "correct": 2
            }
        ]
    }
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
            },
            {
                "question": "Count by 2s: 2, 4, 6, ?",
                "options": ["7", "8", "9", "10"],
                "correct": 1,
                "explanation": "Excellent! 8 comes next when counting by 2s!"
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
            },
            {
                "question": "How many sides does a square have?",
                "options": ["3", "4", "5", "6"],
                "correct": 1,
                "explanation": "Perfect! A square has 4 equal sides!"
            }
        ]
    },
    {
        "id": "3",
        "title": "Addition Adventure",
        "description": "Help the friendly monsters solve addition problems!",
        "type": "addition",
        "ageGroup": "6-8",
        "difficulty": "medium",
        "image": "➕",
        "exercises": [
            {
                "question": "2 + 3 = ?",
                "options": ["4", "5", "6", "7"],
                "correct": 1,
                "explanation": "Amazing! 2 plus 3 equals 5!"
            },
            {
                "question": "If you have 4 apples and get 2 more, how many do you have?",
                "options": ["5", "6", "7", "8"],
                "correct": 1,
                "explanation": "Super! 4 + 2 = 6 apples!"
            },
            {
                "question": "7 + 2 = ?",
                "options": ["8", "9", "10", "11"],
                "correct": 1,
                "explanation": "Fantastic! 7 plus 2 equals 9!"
            }
        ]
    },
    {
        "id": "4",
        "title": "Subtraction Heroes",
        "description": "Join the superhero team to solve subtraction mysteries!",
        "type": "subtraction",
        "ageGroup": "6-8",
        "difficulty": "medium",
        "image": "➖",
        "exercises": [
            {
                "question": "8 - 3 = ?",
                "options": ["4", "5", "6", "7"],
                "correct": 1,
                "explanation": "Super! 8 minus 3 equals 5!"
            },
            {
                "question": "If you had 10 cookies and ate 4, how many are left?",
                "options": ["5", "6", "7", "8"],
                "correct": 1,
                "explanation": "Great! 10 - 4 = 6 cookies left!"
            },
            {
                "question": "15 - 7 = ?",
                "options": ["6", "7", "8", "9"],
                "correct": 2,
                "explanation": "Excellent! 15 minus 7 equals 8!"
            }
        ]
    },
    {
        "id": "5",
        "title": "Pattern Power",
        "description": "Discover amazing patterns with colors, shapes, and numbers!",
        "type": "patterns",
        "ageGroup": "5-8",
        "difficulty": "easy",
        "image": "🌟",
        "exercises": [
            {
                "question": "What comes next? Red, Blue, Red, Blue, ?",
                "options": ["Red", "Blue", "Green", "Yellow"],
                "correct": 0,
                "explanation": "Perfect! The pattern repeats: Red, Blue, Red!"
            },
            {
                "question": "Complete the pattern: ○ △ ○ △ ?",
                "options": ["○", "△", "□", "◊"],
                "correct": 0,
                "explanation": "Great! Circle comes next in this pattern!"
            },
            {
                "question": "What's missing? 1, 3, 5, ?, 9",
                "options": ["6", "7", "8", "10"],
                "correct": 1,
                "explanation": "Awesome! It's counting odd numbers: 7!"
            }
        ]
    }
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