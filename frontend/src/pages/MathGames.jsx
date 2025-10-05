import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calculator, Star, Users, Trophy } from 'lucide-react';
import { mathGames } from '../mock/mockData';

const MathGames = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'counting': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'shapes': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'addition': return 'bg-green-100 text-green-700 border-green-300';
      case 'subtraction': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-700 mb-6">
            🔢 Math Adventures
          </h1>
          <p className="text-xl text-orange-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Explore numbers, shapes, and fun math challenges that make learning exciting!
          </p>
        </div>

        {/* Math Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🔢</div>
              <h3 className="font-bold text-blue-700">Counting Fun</h3>
              <p className="text-blue-600 text-sm">Learn numbers 1-100</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-200 hover:border-purple-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🔴</div>
              <h3 className="font-bold text-purple-700">Shape Safari</h3>
              <p className="text-purple-600 text-sm">Discover shapes & patterns</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">➕</div>
              <h3 className="font-bold text-green-700">Addition Magic</h3>
              <p className="text-green-600 text-sm">Add numbers together</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-orange-200 hover:border-orange-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">➖</div>
              <h3 className="font-bold text-orange-700">Subtraction Quest</h3>
              <p className="text-orange-600 text-sm">Take numbers away</p>
            </CardContent>
          </Card>
        </div>

        {/* Math Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mathGames.map((game) => (
            <Card key={game.id} className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getTypeColor(game.type)} border font-semibold`}>
                    {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                  </Badge>
                  <Badge className={`${getDifficultyColor(game.difficulty)} border font-semibold`}>
                    {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {game.image}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-orange-700 text-center mb-2">
                  {game.title}
                </CardTitle>
                <CardDescription className="text-orange-600 font-medium text-center leading-relaxed">
                  {game.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-orange-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Ages {game.ageGroup}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{game.exercises?.length || 5} Problems</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105"
                >
                  <Link to={`/math/${game.id}`}>
                    <Calculator className="w-5 h-5 mr-2" />
                    Play Game
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-16 py-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              🏆 Math Challenge Progress
            </h2>
            <p className="text-lg text-blue-600 font-medium mb-8 max-w-2xl mx-auto">
              Complete math games to earn stars and unlock new challenges!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-700">12</div>
                  <div className="text-blue-600 font-medium">Games Completed</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600">⭐ 48</div>
                  <div className="text-yellow-600 font-medium">Stars Earned</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-700">🏅 5</div>
                  <div className="text-purple-600 font-medium">Badges Unlocked</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/stories">
                  Read Stories Too!
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/life-skills">
                  Learn Life Skills!
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathGames;