import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Shield, Heart, Smile, Star, Users, BookOpen } from 'lucide-react';
import { lifeSkills } from '../mock/mockData';

const LifeSkills = () => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'safety': return 'bg-red-100 text-red-700 border-red-300';
      case 'social': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'health': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'safety': return Shield;
      case 'social': return Heart;
      case 'health': return Smile;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-700 mb-6">
            🌟 Life Skills
          </h1>
          <p className="text-xl text-orange-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Learn important skills for everyday life - from staying safe to being kind and taking care of yourself!
          </p>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-red-200 hover:border-red-300 transition-all">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-red-700">Safety First</h3>
              <p className="text-red-600 font-medium">Learn to stay safe at home, school, and outside</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-blue-700">Social Skills</h3>
              <p className="text-blue-600 font-medium">Make friends and be kind to others</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 hover:border-green-300 transition-all">
            <CardContent className="p-6 text-center">
              <Smile className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-700">Healthy Habits</h3>
              <p className="text-green-600 font-medium">Take care of your body and mind</p>
            </CardContent>
          </Card>
        </div>

        {/* Life Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lifeSkills.map((skill) => {
            const CategoryIcon = getCategoryIcon(skill.category);
            return (
              <Card key={skill.id} className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getCategoryColor(skill.category)} border font-semibold`}>
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
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
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CategoryIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl mb-3">{skill.image}</div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-orange-700 text-center mb-2">
                    {skill.title}
                  </CardTitle>
                  <CardDescription className="text-orange-600 font-medium text-center leading-relaxed">
                    {skill.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-orange-600 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">Ages {skill.ageGroup}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-medium">{skill.lessons?.length || 2} Lessons</span>
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105"
                  >
                    <Link to={`/life-skills/${skill.id}`}>
                      <CategoryIcon className="w-5 h-5 mr-2" />
                      Learn Skill
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Life Skills Section */}
        <div className="mt-16 py-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6">
              🎆 Why Life Skills Matter
            </h2>
            <p className="text-lg text-purple-600 font-medium mb-8 max-w-3xl mx-auto">
              Learning life skills helps you grow up to be confident, safe, and kind. These skills will help you every day!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="border-2 border-red-200">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <div className="text-xl font-bold text-red-700">Stay Safe</div>
                  <div className="text-red-600 font-medium">Know how to protect yourself</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <div className="text-xl font-bold text-blue-700">Be Kind</div>
                  <div className="text-blue-600 font-medium">Make friends and help others</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200">
                <CardContent className="p-6 text-center">
                  <Smile className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <div className="text-xl font-bold text-green-700">Stay Healthy</div>
                  <div className="text-green-600 font-medium">Take good care of yourself</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/stories">
                  Read Fun Stories!
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/math">
                  Try Math Games!
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Daily Skills Reminder */}
        <div className="mt-16 text-center py-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-6">
            🌅 Practice Every Day!
          </h2>
          <p className="text-lg text-orange-600 font-medium max-w-2xl mx-auto">
            The best way to learn life skills is to practice them every day. Start with one skill and make it a habit!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifeSkills;