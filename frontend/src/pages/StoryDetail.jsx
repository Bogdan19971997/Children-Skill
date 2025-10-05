import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Users, Clock } from 'lucide-react';
import { stories } from '../mock/mockData';
import { toast } from 'sonner';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const foundStory = stories.find(s => s.id === parseInt(id));
    setStory(foundStory);
  }, [id]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">Story not found</h2>
          <Link to="/stories">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleNextPage = () => {
    if (currentPage < story.content.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (story.questions && !showQuiz) {
      setShowQuiz(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
    story.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correctCount++;
      }
    });
    
    setQuizCompleted(true);
    toast.success(`Great job! You got ${correctCount} out of ${story.questions.length} questions right! 🌟`);
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/stories">
            <Button variant="outline" className="mb-6 border-orange-300 text-orange-600 hover:bg-orange-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{story.image}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-4">
              {story.title}
            </h1>
            <p className="text-xl text-orange-600 font-medium mb-6">
              {story.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm">
              <Badge className={`${getTypeColor(story.type)} border font-semibold`}>
                {story.type.charAt(0).toUpperCase() + story.type.slice(1)}
              </Badge>
              <div className="flex items-center space-x-1 text-orange-600">
                <Users className="w-4 h-4" />
                <span className="font-medium">Ages {story.ageGroup}</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{story.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        {!showQuiz && (
          <Card className="border-2 border-orange-200 mb-8">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
              <CardTitle className="text-2xl font-bold text-orange-700 text-center">
                Page {currentPage + 1} of {story.content.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-xl leading-relaxed text-gray-700 font-medium mb-8">
                  {story.content[currentPage]}
                </p>
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-100 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="text-orange-600 font-medium">
                    {currentPage + 1} / {story.content.length}
                  </div>
                  
                  <Button
                    onClick={handleNextPage}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {currentPage === story.content.length - 1 && story.questions ? 'Take Quiz!' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Section */}
        {showQuiz && story.questions && (
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="text-2xl font-bold text-green-700 text-center">
                📝 Story Quiz - Test Your Understanding!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {story.questions.map((question, qIndex) => (
                  <div key={qIndex} className="p-6 border-2 border-green-100 rounded-lg">
                    <h3 className="text-lg font-bold text-green-700 mb-4">
                      Question {qIndex + 1}: {question.question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[qIndex] === oIndex;
                        const isCorrect = question.correct === oIndex;
                        const showResult = quizCompleted;
                        
                        return (
                          <Button
                            key={oIndex}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => !quizCompleted && handleQuizAnswer(qIndex, oIndex)}
                            className={`p-4 h-auto justify-start text-left ${
                              showResult
                                ? isCorrect
                                  ? 'bg-green-500 text-white border-green-500'
                                  : isSelected
                                  ? 'bg-red-500 text-white border-red-500'
                                  : 'border-gray-300'
                                : isSelected
                                ? 'bg-orange-500 text-white'
                                : 'border-orange-300 text-orange-600 hover:bg-orange-100'
                            }`}
                            disabled={quizCompleted}
                          >
                            <div className="flex items-center space-x-2">
                              {showResult && isCorrect && <CheckCircle className="w-5 h-5" />}
                              <span>{option}</span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                {!quizCompleted ? (
                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < story.questions.length}
                    className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3"
                  >
                    Submit Quiz!
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-green-700">🎉 Quiz Complete!</div>
                    <Link to="/stories">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Read More Stories
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;