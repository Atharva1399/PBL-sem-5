import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Code, Brain, Target } from 'lucide-react';

const JobAssessment = ({ jobRole, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);

  // Job-specific assessment questions
  const assessmentQuestions = {
    fullstack: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the difference between frontend and backend development?',
        options: [
          'Frontend handles user interface, backend handles server logic',
          'Frontend is easier than backend',
          'Backend only deals with databases',
          'There is no difference'
        ],
        correct: 0,
        difficulty: 'beginner'
      },
      {
        id: 2,
        type: 'code',
        question: 'Write a simple JavaScript function that adds two numbers:',
        placeholder: 'function addNumbers(a, b) {\n  // Your code here\n}',
        expectedOutput: 'Should return the sum of two numbers',
        difficulty: 'beginner'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which of the following is NOT a JavaScript framework/library?',
        options: ['React', 'Vue.js', 'Angular', 'Laravel'],
        correct: 3,
        difficulty: 'intermediate'
      },
      {
        id: 4,
        type: 'scenario',
        question: 'You need to build a web application that handles user authentication, stores data, and provides a responsive UI. What technologies would you choose and why?',
        placeholder: 'Describe your technology stack and reasoning...',
        difficulty: 'advanced'
      }
    ],
    frontend: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correct: 1,
        difficulty: 'beginner'
      },
      {
        id: 2,
        type: 'code',
        question: 'Create a CSS rule to center a div horizontally and vertically:',
        placeholder: '.center {\n  /* Your CSS here */\n}',
        expectedOutput: 'Should center the element in its container',
        difficulty: 'intermediate'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which React hook is used for managing component state?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correct: 1,
        difficulty: 'intermediate'
      }
    ],
    backend: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is an API?',
        options: [
          'A programming language',
          'Application Programming Interface',
          'A database system',
          'A web browser'
        ],
        correct: 1,
        difficulty: 'beginner'
      },
      {
        id: 2,
        type: 'code',
        question: 'Write a simple Node.js function to handle a GET request:',
        placeholder: 'app.get("/api/users", (req, res) => {\n  // Your code here\n});',
        expectedOutput: 'Should return a JSON response',
        difficulty: 'intermediate'
      }
    ]
  };

  const questions = assessmentQuestions[jobRole.id] || assessmentQuestions.fullstack;
  const totalQuestions = questions.length;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAssessment = () => {
    setIsCompleted(true);
    
    // Calculate score and generate learning path
    const score = calculateScore();
    const learningPath = generateLearningPath(score);
    
    setTimeout(() => {
      onComplete({
        score,
        answers,
        learningPath,
        jobRole
      });
    }, 2000);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    questions.forEach(question => {
      if (question.type === 'multiple-choice' && answers[question.id] !== undefined) {
        total++;
        if (answers[question.id] === question.correct) {
          correct++;
        }
      } else if (question.type === 'code' || question.type === 'scenario') {
        total++;
        if (answers[question.id] && answers[question.id].trim().length > 10) {
          correct += 0.7; // Partial credit for code/scenario questions
        }
      }
    });

    return Math.round((correct / total) * 100);
  };

  const generateLearningPath = (score) => {
    const level = score >= 80 ? 'advanced' : score >= 60 ? 'intermediate' : 'beginner';
    
    const learningPaths = {
      fullstack: {
        beginner: [
          { title: 'HTML & CSS Fundamentals', duration: '2 weeks', difficulty: 'Beginner' },
          { title: 'JavaScript Basics', duration: '3 weeks', difficulty: 'Beginner' },
          { title: 'React Introduction', duration: '4 weeks', difficulty: 'Intermediate' },
          { title: 'Node.js Basics', duration: '3 weeks', difficulty: 'Intermediate' },
          { title: 'Database Fundamentals', duration: '2 weeks', difficulty: 'Intermediate' },
          { title: 'Full Stack Project', duration: '4 weeks', difficulty: 'Advanced' }
        ],
        intermediate: [
          { title: 'Advanced JavaScript', duration: '2 weeks', difficulty: 'Intermediate' },
          { title: 'React Advanced Concepts', duration: '3 weeks', difficulty: 'Intermediate' },
          { title: 'Node.js & Express', duration: '3 weeks', difficulty: 'Intermediate' },
          { title: 'Database Design', duration: '2 weeks', difficulty: 'Advanced' },
          { title: 'API Development', duration: '3 weeks', difficulty: 'Advanced' },
          { title: 'Deployment & DevOps', duration: '2 weeks', difficulty: 'Advanced' }
        ],
        advanced: [
          { title: 'System Design', duration: '3 weeks', difficulty: 'Advanced' },
          { title: 'Microservices Architecture', duration: '4 weeks', difficulty: 'Advanced' },
          { title: 'Advanced React Patterns', duration: '2 weeks', difficulty: 'Advanced' },
          { title: 'Performance Optimization', duration: '3 weeks', difficulty: 'Advanced' },
          { title: 'Security Best Practices', duration: '2 weeks', difficulty: 'Advanced' }
        ]
      },
      frontend: {
        beginner: [
          { title: 'HTML & CSS Mastery', duration: '3 weeks', difficulty: 'Beginner' },
          { title: 'JavaScript Fundamentals', duration: '4 weeks', difficulty: 'Beginner' },
          { title: 'Responsive Design', duration: '2 weeks', difficulty: 'Intermediate' },
          { title: 'React Basics', duration: '4 weeks', difficulty: 'Intermediate' },
          { title: 'Frontend Project', duration: '3 weeks', difficulty: 'Intermediate' }
        ],
        intermediate: [
          { title: 'Advanced CSS & Animations', duration: '2 weeks', difficulty: 'Intermediate' },
          { title: 'React Advanced', duration: '3 weeks', difficulty: 'Intermediate' },
          { title: 'State Management', duration: '2 weeks', difficulty: 'Advanced' },
          { title: 'Testing Frontend Apps', duration: '2 weeks', difficulty: 'Advanced' },
          { title: 'Performance Optimization', duration: '2 weeks', difficulty: 'Advanced' }
        ],
        advanced: [
          { title: 'Advanced React Patterns', duration: '3 weeks', difficulty: 'Advanced' },
          { title: 'Frontend Architecture', duration: '3 weeks', difficulty: 'Advanced' },
          { title: 'Advanced Testing', duration: '2 weeks', difficulty: 'Advanced' },
          { title: 'Build Tools & Optimization', duration: '2 weeks', difficulty: 'Advanced' }
        ]
      }
    };

    return learningPaths[jobRole.id]?.[level] || learningPaths.fullstack[level];
  };

  const currentQ = questions[currentQuestion];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Complete!</h2>
          <p className="text-gray-600 mb-6">
            We're generating your personalized learning path based on your responses...
          </p>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{jobRole.title} Assessment</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {totalQuestions}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentQ.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                currentQ.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQ.difficulty}
              </span>
              
              <div className="flex items-center space-x-2 text-gray-500">
                {currentQ.type === 'code' && <Code className="w-5 h-5" />}
                {currentQ.type === 'scenario' && <Brain className="w-5 h-5" />}
                {currentQ.type === 'multiple-choice' && <Target className="w-5 h-5" />}
                <span className="text-sm capitalize">{currentQ.type.replace('-', ' ')}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>

            {currentQ.type === 'multiple-choice' && (
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerChange(currentQ.id, index)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                      answers[currentQ.id] === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[currentQ.id] === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQ.id] === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {(currentQ.type === 'code' || currentQ.type === 'scenario') && (
              <div className="space-y-4">
                {currentQ.expectedOutput && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Expected:</strong> {currentQ.expectedOutput}
                    </p>
                  </div>
                )}
                <textarea
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined || (typeof answers[currentQ.id] === 'string' && !answers[currentQ.id].trim())}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>{currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobAssessment;