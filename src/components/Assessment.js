import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

const Assessment = ({ skill, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      id: 1,
      question: `What is the primary purpose of ${skill.name}?`,
      options: [
        'To create interactive user interfaces',
        'To manage server-side logic',
        'To style web pages',
        'To store data in databases'
      ],
      correct: 0,
      explanation: 'This is the fundamental concept behind this technology.'
    },
    {
      id: 2,
      question: `Which of the following is a best practice when working with ${skill.name}?`,
      options: [
        'Always use inline styles',
        'Keep components small and focused',
        'Avoid using any external libraries',
        'Write all code in a single file'
      ],
      correct: 1,
      explanation: 'Keeping components small and focused improves maintainability and reusability.'
    },
    {
      id: 3,
      question: `What is the most common mistake beginners make with ${skill.name}?`,
      options: [
        'Not understanding the core concepts',
        'Using too many external libraries',
        'Writing too much documentation',
        'Testing their code too frequently'
      ],
      correct: 0,
      explanation: 'Understanding core concepts is essential before moving to advanced topics.'
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correct
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const handleComplete = () => {
    const score = calculateScore();
    const passed = score >= 70;
    onComplete(passed);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
  };

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card p-8 max-w-md w-full text-center"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            passed ? 'bg-success-500' : 'bg-danger-500'
          }`}>
            {passed ? (
              <Trophy className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            You scored <span className="font-bold text-2xl text-primary-500">{score}%</span>
          </p>
          
          <p className="text-gray-600 mb-8">
            {passed 
              ? `Great job! You've mastered ${skill.name}. Ready for the next challenge?`
              : `You need 70% to pass. Review the material and try again!`
            }
          </p>
          
          <div className="space-y-3">
            {passed ? (
              <button onClick={handleComplete} className="btn-primary w-full">
                Continue Learning Journey
              </button>
            ) : (
              <button onClick={handleRetry} className="btn-primary w-full">
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </button>
            )}
            <button onClick={() => onComplete(false)} className="btn-secondary w-full">
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? isCorrect && index === currentQ.correct
                          ? 'border-success-500 bg-success-50 text-success-700'
                          : index === selectedAnswer && !isCorrect
                          ? 'border-danger-500 bg-danger-50 text-danger-700'
                          : index === currentQ.correct
                          ? 'border-success-500 bg-success-50 text-success-700'
                          : 'border-gray-300 bg-white'
                        : 'border-primary-500 bg-primary-50 text-primary-700'
                      : showFeedback && index === currentQ.correct
                      ? 'border-success-500 bg-success-50 text-success-700'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 text-success-500" />
                    )}
                    {showFeedback && index === selectedAnswer && !isCorrect && (
                      <XCircle className="w-5 h-5 text-danger-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 ${
                    isCorrect ? 'bg-success-50 border border-success-200' : 'bg-danger-50 border border-danger-200'
                  }`}
                >
                  <p className={`font-medium ${isCorrect ? 'text-success-700' : 'text-danger-700'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className={`text-sm mt-1 ${isCorrect ? 'text-success-600' : 'text-danger-600'}`}>
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {!showFeedback && (
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Assessment;