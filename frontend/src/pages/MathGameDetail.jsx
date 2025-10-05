import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle, Trophy, Star } from 'lucide-react';
import { mathGames } from '../mock/mockData';
import { toast } from 'sonner';

const MathGameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const foundGame = mathGames.find(g => g.id === parseInt(id));
    setGame(foundGame);
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">Game not found</h2>
          <Link to="/math">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Back to Math Games
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentExercise = game.exercises[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    const isCorrect = selectedAnswer === currentExercise.correct;
    const newAnswers = { ...userAnswers, [currentQuestion]: { selected: selectedAnswer, correct: isCorrect } };
    setUserAnswers(newAnswers);
    setShowResult(true);

    if (isCorrect) {
      toast.success(currentExercise.explanation || "Great job! 🌟");
    } else {
      toast.error("Not quite right. Try again! 💪");
    }

    setTimeout(() => {
      if (currentQuestion < game.exercises.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Game completed
        const finalScore = Object.values(newAnswers).filter(a => a.correct).length;
        setScore(finalScore);
        setGameCompleted(true);
        toast.success(`Game Complete! You scored ${finalScore}/${game.exercises.length}! 🎉`);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setShowResult(false);
    setGameCompleted(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 text-center">
              <div className="text-8xl mb-4">🎉</div>
              <CardTitle className="text-4xl font-bold text-green-700">
                Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  You completed {game.title}!
                </h2>
                <div className="text-6xl font-bold text-green-600 mb-2">
                  {score}/{game.exercises.length}
                </div>
                <p className="text-green-600 font-medium text-lg">
                  {score === game.exercises.length ? "Perfect Score! Amazing!" : 
                   score >= game.exercises.length * 0.8 ? "Excellent Work!" :
                   score >= game.exercises.length * 0.6 ? "Good Job!" : "Keep Practicing!"}
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-8 h-8 ${i < Math.ceil((score / game.exercises.length) * 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={restartGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
                <Link to="/math">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                    <Trophy className="w-5 h-5 mr-2" />
                    More Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/math">
            <Button variant="outline" className="mb-6 border-orange-300 text-orange-600 hover:bg-orange-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Math Games
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{game.image}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-4">
              {game.title}
            </h1>
            <p className="text-xl text-orange-600 font-medium mb-6">
              {game.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6">
              <Badge className={`${getDifficultyColor(game.difficulty)} border font-semibold text-lg px-4 py-2`}>
                {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
              </Badge>
              <div className="text-orange-600 font-medium text-lg">
                Question {currentQuestion + 1} of {game.exercises.length}
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-orange-700">
                Question {currentQuestion + 1}
              </CardTitle>
              <div className="text-orange-600 font-medium">
                Score: {Object.values(userAnswers).filter(a => a.correct).length}/{Object.keys(userAnswers).length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8 leading-relaxed">
                {currentExercise.question}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {currentExercise.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = currentExercise.correct === index;
                  
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`p-6 h-auto text-xl font-bold transition-all duration-300 ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white border-green-500 transform scale-105'
                            : isSelected
                            ? 'bg-red-500 text-white border-red-500'
                            : 'border-gray-300'
                          : isSelected
                          ? 'bg-orange-500 text-white transform scale-105'
                          : 'border-orange-300 text-orange-600 hover:bg-orange-100 hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {showResult && isCorrect && <CheckCircle className="w-6 h-6" />}
                        <span>{option}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {showResult && (
              <div className="text-center mb-6">
                <div className={`text-lg font-medium p-4 rounded-lg ${
                  userAnswers[currentQuestion]?.correct 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {currentExercise.explanation}
                </div>
              </div>
            )}
            
            <div className="text-center">
              {!showResult ? (
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-8 py-4 disabled:opacity-50"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="text-orange-600 font-medium text-lg">
                  {currentQuestion < game.exercises.length - 1 ? 'Moving to next question...' : 'Calculating final score...'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MathGameDetail;