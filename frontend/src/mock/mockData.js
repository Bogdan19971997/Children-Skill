// Mock data for the KidsLearn application

export const stories = [
  {
    id: 1,
    title: "The Magic Forest Adventure",
    description: "Follow Lily as she discovers a magical forest full of talking animals and learns about friendship!",
    type: "adventure",
    ageGroup: "4-6",
    duration: "5 min",
    image: "🌳",
    content: [
      "Once upon a time, there was a little girl named Lily who loved to explore.",
      "One sunny day, she found a path she had never seen before in her backyard.",
      "The path led to a magical forest where the trees sparkled like diamonds!",
      "Lily met a wise old owl who taught her about being kind to all creatures.",
      "She made friends with a playful rabbit and a gentle deer.",
      "From that day on, Lily visited her new friends every day and learned that friendship is the greatest magic of all!"
    ],
    questions: [
      {
        question: "What did Lily discover in her backyard?",
        options: ["A new path", "A toy", "A flower", "A book"],
        correct: 0
      },
      {
        question: "Who taught Lily about being kind?",
        options: ["A rabbit", "A deer", "An owl", "Her mother"],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: "Tommy's First Day at School",
    description: "Join Tommy as he overcomes his fears and makes new friends on his first day at school.",
    type: "educational",
    ageGroup: "5-7",
    duration: "6 min",
    image: "🏫",
    content: [
      "Tommy was nervous about his first day at school. His tummy felt funny!",
      "His mom gave him a big hug and said, 'You'll do great, Tommy!'",
      "At school, Tommy met his teacher, Mrs. Johnson, who had a warm smile.",
      "During playtime, Tommy shared his crayons with a boy named Sam.",
      "Sam became Tommy's first friend, and they played together all day.",
      "Tommy learned that being kind and sharing makes it easy to make friends!"
    ],
    questions: [
      {
        question: "How did Tommy feel on his first day?",
        options: ["Happy", "Nervous", "Angry", "Sleepy"],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: "The Counting Caterpillar",
    description: "Help Chester the Caterpillar count his way through the garden while learning numbers 1-10!",
    type: "interactive",
    ageGroup: "4-6",
    duration: "4 min",
    image: "🐛",
    content: [
      "Chester the Caterpillar loved to munch on leaves in the garden.",
      "He ate 1 leaf for breakfast. Munch, munch!",
      "Then he found 2 more leaves by the roses.",
      "By the pond, he discovered 3 beautiful lily pad leaves.",
      "Chester counted all his leaves: 1, 2, 3, 4, 5, 6!",
      "He was so full and happy that he took a nap under a sunflower!"
    ],
    interactions: [
      {
        type: "count",
        question: "How many leaves did Chester eat by the roses?",
        answer: 2
      },
      {
        type: "count",
        question: "Count all the leaves Chester ate. How many total?",
        answer: 6
      }
    ]
  },
  {
    id: 4,
    title: "The Brave Little Mouse",
    description: "Meet Max the mouse who learns that being brave doesn't mean you're never scared!",
    type: "adventure",
    ageGroup: "4-7",
    duration: "7 min",
    image: "🐭",
    content: [
      "Max was the smallest mouse in his family, and he was afraid of many things.",
      "One day, his little sister got stuck behind a big box in the kitchen.",
      "Even though Max was scared, he knew he had to help his sister.",
      "He took a deep breath and squeezed through the small space to reach her.",
      "Max helped his sister climb out safely, and everyone cheered!",
      "Max learned that being brave means doing the right thing even when you're scared."
    ],
    questions: [
      {
        question: "What happened to Max's sister?",
        options: ["She got lost", "She got stuck", "She got hurt", "She got hungry"],
        correct: 1
      },
      {
        question: "What did Max learn about being brave?",
        options: ["Never be scared", "Hide from problems", "Help others even when scared", "Run away fast"],
        correct: 2
      }
    ]
  },
  {
    id: 5,
    title: "The Rainbow Garden",
    description: "Learn about colors and emotions with Emma as she plants a magical rainbow garden!",
    type: "educational",
    ageGroup: "4-6",
    duration: "5 min",
    image: "🌈",
    content: [
      "Emma loved colors and wanted to plant a special garden with every color of the rainbow.",
      "She planted red roses because red makes us feel strong and excited.",
      "Orange marigolds went next - orange makes us feel happy and energetic!",
      "Yellow sunflowers were planted third - yellow is like sunshine and makes us cheerful.",
      "Green herbs filled the middle - green makes us feel calm and peaceful.",
      "Blue forget-me-nots and purple lavender completed her beautiful rainbow garden!"
    ],
    questions: [
      {
        question: "What color makes us feel calm and peaceful?",
        options: ["Red", "Yellow", "Green", "Purple"],
        correct: 2
      }
    ]
  },
  {
    id: 6,
    title: "Captain Clean's Adventure",
    description: "Join Captain Clean as he teaches kids about hygiene and staying healthy!",
    type: "educational",
    ageGroup: "5-8",
    duration: "6 min",
    image: "🦸",
    content: [
      "Captain Clean was a superhero who fought germs and helped kids stay healthy.",
      "His first mission was teaching children how to wash their hands properly.",
      "'Use soap and warm water for 20 seconds!' he said with a smile.",
      "Next, he showed them how brushing teeth twice a day keeps their smile bright.",
      "Captain Clean taught them that eating fruits and vegetables gives them superpowers too!",
      "All the children felt like superheroes when they learned to take care of themselves!"
    ],
    questions: [
      {
        question: "How long should you wash your hands?",
        options: ["5 seconds", "10 seconds", "20 seconds", "1 minute"],
        correct: 2
      }
    ]
  },
  {
    id: 7,
    title: "The Kindness Monster",
    description: "Discover how acts of kindness can turn a scary monster into the best friend ever!",
    type: "interactive",
    ageGroup: "5-9",
    duration: "8 min",
    image: "👹",
    content: [
      "There was once a monster who lived under the bridge and scared everyone who passed.",
      "But little Anna noticed the monster looked sad, not scary.",
      "Instead of running away, Anna asked, 'Are you okay? You look lonely.'",
      "The monster was surprised! Nobody had ever been kind to him before.",
      "Anna brought the monster flowers and taught him how to smile.",
      "Soon, the monster became the happiest helper in the whole village!"
    ],
    interactions: [
      {
        type: "choice",
        question: "What would you do if you met the lonely monster?",
        options: ["Run away", "Be kind to him", "Ignore him", "Call for help"]
      }
    ]
  },
  {
    id: 8,
    title: "The Space Puppy",
    description: "Blast off with Cosmic the puppy as he explores planets and learns about friendship!",
    type: "adventure",
    ageGroup: "6-9",
    duration: "9 min",
    image: "🚀",
    content: [
      "Cosmic was a special puppy who could fly through space in his rocket ship.",
      "On Planet Giggles, he met aliens who loved to laugh and play games.",
      "On Planet Puzzles, he helped solve problems with his new alien friends.",
      "Planet Kindness taught him that sharing snacks makes everyone happy.",
      "When it was time to go home, all his space friends gave him hugs.",
      "Cosmic learned that friendship is the same everywhere in the universe!"
    ],
    questions: [
      {
        question: "What did Cosmic learn about friendship?",
        options: ["It's only for Earth", "It's the same everywhere", "It's not important", "It's too hard"],
        correct: 1
      }
    ]
  },
  {
    id: 9,
    title: "The Magical Library",
    description: "Enter a library where books come to life and teach you amazing things!",
    type: "interactive",
    ageGroup: "7-10",
    duration: "10 min",
    image: "📚",
    content: [
      "Sarah discovered a magical library where books could talk and move around!",
      "The History book told her amazing stories about dinosaurs and ancient castles.",
      "The Science book showed her how plants grow and why the sky is blue.",
      "The Art book taught her to paint with colors that danced on the page.",
      "The Math book made numbers fun by turning them into friendly characters.",
      "Sarah learned that every book has something wonderful to teach!"
    ],
    questions: [
      {
        question: "What did Sarah learn about books?",
        options: ["They are boring", "They teach wonderful things", "They are just paper", "They are hard to read"],
        correct: 1
      }
    ]
  },
  {
    id: 10,
    title: "The Weather Friends",
    description: "Meet Sunny, Rainy, and Snowy as they teach you about different types of weather!",
    type: "educational",
    ageGroup: "4-7",
    duration: "6 min",
    image: "⛅",
    content: [
      "Sunny the sun loved to make everything bright and warm for playing outside.",
      "Rainy the rain cloud helped flowers grow and made puddles for splashing.",
      "Snowy the snowflake created winter wonderlands perfect for snowmen.",
      "Each weather friend had a special job to help the Earth stay healthy.",
      "The children learned to find fun activities for every type of weather.",
      "Together, all the weather friends made each season special and exciting!"
    ],
    questions: [
      {
        question: "What does Rainy the rain cloud help do?",
        options: ["Make snow", "Help flowers grow", "Create sunshine", "Make wind"],
        correct: 1
      }
    ]
  }
];

export const mathGames = [
  {
    id: 1,
    title: "Number Detective",
    description: "Find the missing numbers in fun sequences! Perfect for ages 4-6.",
    type: "counting",
    ageGroup: "4-6",
    difficulty: "easy",
    image: "🔍",
    exercises: [
      {
        question: "What number comes next? 1, 2, 3, ?",
        options: ["4", "5", "6", "7"],
        correct: 0,
        explanation: "Great job! 4 comes after 3!"
      },
      {
        question: "Fill in the missing number: 5, 6, ?, 8",
        options: ["6", "7", "8", "9"],
        correct: 1,
        explanation: "Perfect! 7 goes between 6 and 8!"
      }
    ]
  },
  {
    id: 2,
    title: "Shape Safari",
    description: "Discover different shapes in a fun jungle adventure!",
    type: "shapes",
    ageGroup: "4-7",
    difficulty: "easy",
    image: "🔺",
    exercises: [
      {
        question: "Which shape has 3 sides?",
        options: ["Circle", "Square", "Triangle", "Rectangle"],
        correct: 2,
        explanation: "Excellent! A triangle has 3 sides and 3 corners!"
      },
      {
        question: "What shape is a ball?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correct: 2,
        explanation: "That's right! A ball is round like a circle!"
      }
    ]
  },
  {
    id: 3,
    title: "Addition Adventure",
    description: "Help the friendly monsters solve addition problems!",
    type: "addition",
    ageGroup: "6-8",
    difficulty: "medium",
    image: "➕",
    exercises: [
      {
        question: "2 + 3 = ?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "Amazing! 2 plus 3 equals 5!"
      },
      {
        question: "If you have 4 apples and get 2 more, how many do you have?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "Super! 4 + 2 = 6 apples!"
      }
    ]
  }
];

export const lifeSkills = [
  {
    id: 1,
    title: "Traffic Light Safety",
    description: "Learn how to cross the street safely with traffic lights!",
    category: "safety",
    ageGroup: "4-8",
    image: "🚦",
    lessons: [
      {
        title: "Red Light Means Stop",
        content: "When the light is red, cars must stop. We should wait on the sidewalk.",
        activity: "Point to the red light and say 'STOP!'"
      },
      {
        title: "Green Light Means Go",
        content: "When the light turns green, cars can go. We should still look both ways!",
        activity: "Look left, look right, then cross with an adult."
      }
    ],
    quiz: [
      {
        question: "What should you do when you see a red traffic light?",
        options: ["Run across", "Wait and stop", "Close your eyes", "Wave at cars"],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    title: "Sharing is Caring",
    description: "Discover why sharing with friends makes everyone happy!",
    category: "social",
    ageGroup: "4-7",
    image: "🤝",
    lessons: [
      {
        title: "Taking Turns",
        content: "When we take turns, everyone gets a chance to play and have fun!",
        activity: "Practice saying 'Your turn!' and 'My turn!'"
      },
      {
        title: "Sharing Toys",
        content: "Sharing our toys with friends makes them happy and helps us make more friends!",
        activity: "Think of a toy you could share with a friend today."
      }
    ],
    quiz: [
      {
        question: "What happens when we share with friends?",
        options: ["They get mad", "Everyone is happy", "We lose our toys", "Nothing happens"],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: "Brushing Your Teeth",
    description: "Learn the fun way to keep your teeth clean and healthy!",
    category: "health",
    ageGroup: "4-8",
    image: "🦷",
    lessons: [
      {
        title: "Morning and Night",
        content: "We should brush our teeth twice a day - when we wake up and before bed!",
        activity: "Sing the ABC song while brushing - that's how long to brush!"
      },
      {
        title: "Proper Technique",
        content: "Use gentle circles to clean all your teeth. Don't forget the back ones!",
        activity: "Practice making small circles with your toothbrush."
      }
    ],
    quiz: [
      {
        question: "How many times a day should we brush our teeth?",
        options: ["Once", "Twice", "Three times", "Never"],
        correct: 1
      }
    ]
  }
];

// User progress tracking
export const mockProgress = {
  storiesCompleted: 2,
  mathGamesCompleted: 1,
  lifeSkillsCompleted: 1,
  totalPoints: 150,
  achievements: [
    { id: 1, title: "Story Reader", description: "Read your first story!", earned: true },
    { id: 2, title: "Math Whiz", description: "Complete 5 math games", earned: false },
    { id: 3, title: "Safety Star", description: "Learn about safety rules", earned: true }
  ]
};

export const getUserProgress = () => {
  return mockProgress;
};

export const updateProgress = (type, itemId) => {
  // Mock function to update progress
  console.log(`Progress updated: ${type} - ${itemId}`);
};