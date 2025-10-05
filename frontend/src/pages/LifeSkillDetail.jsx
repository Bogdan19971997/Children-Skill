import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ArrowRight, Shield, Heart, Smile, Users, CheckCircle, Star } from 'lucide-react';
import { lifeSkills } from '../mock/mockData';
import { toast } from 'sonner';

const LifeSkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [skillCompleted, setSkillCompleted] = useState(false);

  useEffect(() => {
    const foundSkill = lifeSkills.find(s => s.id === parseInt(id));
    setSkill(foundSkill);
  }, [id]);

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">Life Skill not found</h2>
          <Link to="/life-skills">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Back to Life Skills
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const CategoryIcon = getCategoryIcon(skill.category);
  const currentLessonData = skill.lessons[currentLesson];

  const handleNextLesson = () => {
    if (currentLesson < skill.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (skill.quiz && !showQuiz) {
      setShowQuiz(true);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    skill.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correctCount++;
      }
    });
    
    setSkillCompleted(true);
    toast.success(`Amazing! You got ${correctCount} out of ${skill.quiz.length} questions right! 🎆`);
  };

  const practiceActivity = () => {
    toast.success("Great job practicing! Keep it up! 🌟");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/life-skills">
            <Button variant="outline" className="mb-6 border-orange-300 text-orange-600 hover:bg-orange-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Life Skills
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center mb-4">
              <CategoryIcon className="w-10 h-10 text-white" />
            </div>
            <div className="text-8xl mb-4">{skill.image}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-4">
              {skill.title}
            </h1>
            <p className="text-xl text-orange-600 font-medium mb-6">
              {skill.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm">
              <Badge className={`${getCategoryColor(skill.category)} border font-semibold`}>
                {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
              </Badge>
              <div className="flex items-center space-x-1 text-orange-600">
                <Users className="w-4 h-4" />
                <span className="font-medium">Ages {skill.ageGroup}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        {!showQuiz && !skillCompleted && (
          <Card className="border-2 border-orange-200 mb-8">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
              <CardTitle className="text-2xl font-bold text-orange-700 text-center">
                Lesson {currentLesson + 1}: {currentLessonData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-gray-700 font-medium mb-6">
                    {currentLessonData.content}
                  </p>
                  
                  {currentLessonData.activity && (
                    <Card className="border-2 border-blue-200 mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-blue-700 text-center">
                          🎯 Try This Activity!
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-blue-600 font-medium text-center mb-4">
                          {currentLessonData.activity}
                        </p>
                        <Button 
                          onClick={practiceActivity}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 mx-auto block"
                        >
                          I Practiced This!
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handlePrevLesson}
                    disabled={currentLesson === 0}
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-100 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="text-orange-600 font-medium">
                    Lesson {currentLesson + 1} of {skill.lessons.length}
                  </div>
                  
                  <Button
                    onClick={handleNextLesson}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {currentLesson === skill.lessons.length - 1 && skill.quiz ? 'Take Quiz!' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Section */}
        {showQuiz && skill.quiz && !skillCompleted && (
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="text-2xl font-bold text-purple-700 text-center">
                🧠 Knowledge Check!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {skill.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="p-6 border-2 border-purple-100 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-700 mb-4">
                      Question {qIndex + 1}: {question.question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[qIndex] === oIndex;
                        
                        return (
                          <Button
                            key={oIndex}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => handleQuizAnswer(qIndex, oIndex)}
                            className={`p-4 h-auto justify-start text-left ${
                              isSelected
                                ? 'bg-purple-500 text-white'
                                : 'border-purple-300 text-purple-600 hover:bg-purple-100'
                            }`}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < skill.quiz.length}
                  className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-3 disabled:opacity-50"
                >
                  Complete Skill!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completion */}
        {skillCompleted && (
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 text-center">
              <div className="text-8xl mb-4">🎆</div>
              <CardTitle className="text-4xl font-bold text-green-700">
                Skill Mastered!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  You've learned {skill.title}!
                </h2>
                <p className="text-green-600 font-medium text-lg mb-6">
                  Remember to practice this skill every day to keep getting better!
                </p>
                
                <div className="flex items-center justify-center space-x-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/life-skills">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                    <Users className="w-5 h-5 mr-2" />
                    Learn More Skills
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100 text-lg px-8 py-3">
                    Read Stories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        {!skillCompleted && (
          <div className="mt-8">
            <div className="bg-orange-100 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${showQuiz ? 100 : ((currentLesson + 1) / skill.lessons.length) * 85}%` 
                }}
              ></div>
            </div>
            <div className="text-center text-orange-600 font-medium">
              {showQuiz ? 'Almost done! Complete the quiz.' : `Progress: ${currentLesson + 1} of ${skill.lessons.length} lessons`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeSkillDetail;