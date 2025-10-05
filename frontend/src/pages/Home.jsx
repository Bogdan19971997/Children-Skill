import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Calculator, Users, Star, Heart, Sparkles } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Interactive Stories',
      description: 'Read-along adventures, fairy tales, and educational stories that spark imagination!',
      icon: BookOpen,
      color: 'from-blue-400 to-cyan-400',
      link: '/stories'
    },
    {
      title: 'Math Adventures',
      description: 'Fun counting games, shape puzzles, and number adventures for all skill levels!',
      icon: Calculator,
      color: 'from-green-400 to-emerald-400',
      link: '/math'
    },
    {
      title: 'Life Skills',
      description: 'Learn about safety, friendship, daily routines, and being a good person!',
      icon: Users,
      color: 'from-purple-400 to-pink-400',
      link: '/life-skills'
    }
  ];

  const stats = [
    { label: 'Stories', value: '50+', icon: BookOpen },
    { label: 'Math Games', value: '30+', icon: Calculator },
    { label: 'Life Lessons', value: '25+', icon: Heart },
    { label: 'Happy Kids', value: '1000+', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-orange-700 mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                KidsLearn!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-600 font-medium max-w-3xl mx-auto leading-relaxed">
              A magical place where children aged 4-10 discover amazing stories, 
              solve fun math puzzles, and learn important life skills!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/stories">
                <Sparkles className="w-6 h-6 mr-2" />
                Start Learning!
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-2 border-orange-400 text-orange-600 hover:bg-orange-100 text-xl px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link to="/math">
                Explore Math Fun
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-700">{stat.value}</div>
                    <div className="text-orange-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-700 mb-6">
              What Will You Learn Today?
            </h2>
            <p className="text-xl text-orange-600 font-medium max-w-2xl mx-auto">
              Choose your adventure and start exploring our fun learning activities!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-orange-600 text-lg font-medium mb-6 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button 
                      asChild
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      <Link to={feature.link}>Explore Now!</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fun Learning Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-700 mb-6">
            Learning is Fun! 🎉
          </h2>
          <p className="text-xl text-orange-600 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of children who are already having fun while learning important skills. 
            Every day is a new adventure waiting to be discovered!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/stories">
                <BookOpen className="w-6 h-6 mr-2" />
                Read Stories
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/math">
                <Calculator className="w-6 h-6 mr-2" />
                Play Math Games
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;