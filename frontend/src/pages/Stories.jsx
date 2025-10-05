import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import { stories } from '../mock/mockData';

const Stories = () => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'adventure': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'educational': return 'bg-green-100 text-green-700 border-green-300';
      case 'interactive': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-orange-100 text-orange-700 border-orange-300';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-700 mb-6">
            📚 Amazing Stories
          </h1>
          <p className="text-xl text-orange-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Discover magical adventures, learn important lessons, and have fun with our collection of interactive stories!
          </p>
        </div>

        {/* Story Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="font-bold text-blue-700">Adventure Stories</h3>
              <p className="text-blue-600 text-sm">Exciting journeys and magical places</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="font-bold text-green-700">Learning Stories</h3>
              <p className="text-green-600 text-sm">Fun stories that teach important lessons</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-200 hover:border-purple-300 transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="font-bold text-purple-700">Interactive Stories</h3>
              <p className="text-purple-600 text-sm">Stories where you make choices!</p>
            </CardContent>
          </Card>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getTypeColor(story.type)} border font-semibold`}>
                    {story.type.charAt(0).toUpperCase() + story.type.slice(1)}
                  </Badge>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {story.image}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-orange-700 text-center mb-2">
                  {story.title}
                </CardTitle>
                <CardDescription className="text-orange-600 font-medium text-center leading-relaxed">
                  {story.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-orange-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Ages {story.ageGroup}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{story.duration}</span>
                  </div>
                </div>
                
                <Button 
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105"
                >
                  <Link to={`/stories/${story.id}`}>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Read Story
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
            Ready for an Adventure? 🚀
          </h2>
          <p className="text-lg text-orange-600 font-medium mb-8 max-w-2xl mx-auto">
            Pick your favorite story and start reading! Each story teaches something new and exciting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/math">
                Try Math Games Too!
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/life-skills">
                Learn Life Skills!
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;