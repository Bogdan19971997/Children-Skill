# KidsLearn API Integration Contracts

## Overview
This document outlines the integration contracts between the frontend React app and the FastAPI backend for the KidsLearn educational platform.

## Backend API Endpoints

### Base URL
- Development: `${REACT_APP_BACKEND_URL}/api`
- All endpoints are prefixed with `/api`

### 1. Stories API

#### GET /api/stories
- **Purpose**: Fetch all stories with optional filtering
- **Query Parameters**:
  - `type`: Filter by story type (adventure, educational, interactive)
  - `age_group`: Filter by age group (4-6, 5-7, etc.)
- **Response**: Array of Story objects
- **Frontend Usage**: Replace `stories` import from mockData.js

#### GET /api/stories/{story_id}
- **Purpose**: Fetch a specific story
- **Parameters**: `story_id` (string)
- **Response**: Single Story object
- **Frontend Usage**: Story detail pages

#### POST /api/stories
- **Purpose**: Create new story (admin feature)
- **Body**: StoryCreate object
- **Response**: Created Story object

### 2. Math Games API

#### GET /api/math-games
- **Purpose**: Fetch all math games with optional filtering
- **Query Parameters**:
  - `type`: Filter by game type (counting, shapes, addition, etc.)
  - `difficulty`: Filter by difficulty (easy, medium, hard)
  - `age_group`: Filter by age group
- **Response**: Array of MathGame objects
- **Frontend Usage**: Replace `mathGames` import from mockData.js

#### GET /api/math-games/{game_id}
- **Purpose**: Fetch a specific math game
- **Parameters**: `game_id` (string)
- **Response**: Single MathGame object
- **Frontend Usage**: Math game detail pages

#### POST /api/math-games
- **Purpose**: Create new math game (admin feature)
- **Body**: MathGameCreate object
- **Response**: Created MathGame object

### 3. Life Skills API

#### GET /api/life-skills
- **Purpose**: Fetch all life skills with optional filtering
- **Query Parameters**:
  - `category`: Filter by category (safety, social, health)
  - `age_group`: Filter by age group
- **Response**: Array of LifeSkill objects
- **Frontend Usage**: Replace `lifeSkills` import from mockData.js

#### GET /api/life-skills/{skill_id}
- **Purpose**: Fetch a specific life skill
- **Parameters**: `skill_id` (string)
- **Response**: Single LifeSkill object
- **Frontend Usage**: Life skill detail pages

#### POST /api/life-skills
- **Purpose**: Create new life skill (admin feature)
- **Body**: LifeSkillCreate object
- **Response**: Created LifeSkill object

### 4. User Management API

#### POST /api/users
- **Purpose**: Create new user profile
- **Body**: `{username: string, age?: number, avatar?: string}`
- **Response**: UserProfile object with default achievements
- **Frontend Usage**: User registration

#### GET /api/users/{user_id}
- **Purpose**: Fetch user profile
- **Parameters**: `user_id` (string)
- **Response**: UserProfile object
- **Frontend Usage**: User dashboard, progress tracking

#### PUT /api/users/{user_id}
- **Purpose**: Update user profile
- **Body**: UserProfileUpdate object (partial updates)
- **Response**: Updated UserProfile object
- **Frontend Usage**: Profile editing

### 5. Progress Tracking API

#### POST /api/progress
- **Purpose**: Update user progress for completed activities
- **Body**: 
  ```json
  {
    "user_id": "string",
    "activity_id": "string", 
    "activity_type": "story|math|lifeskill",
    "answers": [
      {
        "question_index": 0,
        "selected_answer": 1,
        "correct": true
      }
    ],
    "completed": true
  }
  ```
- **Response**: `{message: string, points_earned: number}`
- **Frontend Usage**: After quiz/exercise completion

### 6. Platform Statistics API

#### GET /api/leaderboard
- **Purpose**: Get top users leaderboard
- **Query Parameters**: `limit` (default: 10)
- **Response**: Array of LeaderboardEntry objects
- **Frontend Usage**: Leaderboard display

#### GET /api/stats
- **Purpose**: Get platform-wide statistics
- **Response**: 
  ```json
  {
    "total_users": number,
    "total_stories": number,
    "total_math_games": number,
    "total_life_skills": number,
    "total_activities_completed": number
  }
  ```
- **Frontend Usage**: Admin dashboard, statistics display

## Frontend Integration Steps

### 1. Remove Mock Data Dependencies
- **Files to Update**:
  - `/app/frontend/src/pages/Stories.jsx`
  - `/app/frontend/src/pages/StoryDetail.jsx` 
  - `/app/frontend/src/pages/MathGames.jsx`
  - `/app/frontend/src/pages/MathGameDetail.jsx`
  - `/app/frontend/src/pages/LifeSkills.jsx`
  - `/app/frontend/src/pages/LifeSkillDetail.jsx`
  - `/app/frontend/src/pages/Home.jsx`

- **Changes Required**:
  - Replace `import { stories, mathGames, lifeSkills } from '../mock/mockData'`
  - Add API calls using axios: `axios.get(`${BACKEND_URL}/api/stories`)`
  - Add loading states and error handling
  - Add user context for progress tracking

### 2. Add User Context
Create `/app/frontend/src/contexts/UserContext.jsx`:
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage or create new user
  useEffect(() => {
    const savedUser = localStorage.getItem('kidslearn_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const createUser = async (username, age) => {
    // API call to create user
    // Save to localStorage
    // Set user state
  };

  const updateProgress = async (activityId, activityType, answers, completed) => {
    // API call to update progress
    // Update user state
  };

  return (
    <UserContext.Provider value={{
      user, setUser, createUser, updateProgress, loading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
```

### 3. Add API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const storiesAPI = {
  getAll: (filters = {}) => api.get('/stories', { params: filters }),
  getById: (id) => api.get(`/stories/${id}`),
};

export const mathGamesAPI = {
  getAll: (filters = {}) => api.get('/math-games', { params: filters }),
  getById: (id) => api.get(`/math-games/${id}`),
};

export const lifeSkillsAPI = {
  getAll: (filters = {}) => api.get('/life-skills', { params: filters }),
  getById: (id) => api.get(`/life-skills/${id}`),
};

export const usersAPI = {
  create: (userData) => api.post('/users', userData),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
};

export const progressAPI = {
  update: (progressData) => api.post('/progress', progressData),
};

export const platformAPI = {
  getLeaderboard: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
  getStats: () => api.get('/stats'),
};
```

### 4. Update Component Structure
- **Add Loading States**: Show loading spinners while fetching data
- **Add Error Handling**: Display error messages for failed API calls
- **Add User Registration**: Create user registration flow
- **Add Progress Tracking**: Track and display user progress
- **Add Achievement System**: Show earned achievements and progress

## Data Models

### Story Object
```typescript
{
  id: string;
  title: string;
  description: string;
  type: "adventure" | "educational" | "interactive";
  ageGroup: string;
  duration: string;
  image: string;
  content: string[];
  questions?: QuestionObject[];
  interactions?: InteractionObject[];
  created_at: string;
  updated_at: string;
}
```

### MathGame Object
```typescript
{
  id: string;
  title: string;
  description: string;
  type: "counting" | "shapes" | "addition" | "subtraction" | etc.;
  ageGroup: string;
  difficulty: "easy" | "medium" | "hard";
  image: string;
  exercises: ExerciseObject[];
  created_at: string;
  updated_at: string;
}
```

### LifeSkill Object
```typescript
{
  id: string;
  title: string;
  description: string;
  category: "safety" | "social" | "health";
  ageGroup: string;
  image: string;
  lessons: LessonObject[];
  quiz?: QuizObject[];
  created_at: string;
  updated_at: string;
}
```

### UserProfile Object
```typescript
{
  id: string;
  username: string;
  age?: number;
  avatar: string;
  total_points: number;
  stories_completed: number;
  math_games_completed: number;
  life_skills_completed: number;
  progress: ActivityProgress[];
  achievements: Achievement[];
  created_at: string;
  last_active: string;
}
```

## Migration Checklist

- [ ] 1. Backup current mock data
- [ ] 2. Create user context and authentication flow
- [ ] 3. Add API service layer
- [ ] 4. Update Stories page to use API
- [ ] 5. Update StoryDetail page to use API
- [ ] 6. Update MathGames page to use API  
- [ ] 7. Update MathGameDetail page to use API
- [ ] 8. Update LifeSkills page to use API
- [ ] 9. Update LifeSkillDetail page to use API
- [ ] 10. Add progress tracking to all interactive elements
- [ ] 11. Add user dashboard/profile page
- [ ] 12. Add achievement system display
- [ ] 13. Add leaderboard page
- [ ] 14. Test all functionality
- [ ] 15. Remove mock data files

## Testing Checklist

- [ ] User registration flow works
- [ ] All content loads from API
- [ ] Progress tracking works correctly
- [ ] Achievements are awarded properly
- [ ] Points system functions correctly
- [ ] Leaderboard displays properly
- [ ] Error states are handled gracefully
- [ ] Loading states provide good UX