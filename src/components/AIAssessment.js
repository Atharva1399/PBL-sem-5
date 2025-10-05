import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Brain, ArrowRight, Loader } from 'lucide-react';

const AIAssessment = ({ topic, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);

  // AI-generated questions based on topic
  const generateQuestions = (topicTitle) => [
    {
      id: 1,
      question: `What is your current experience level with ${topicTitle}?`,
      options: [
        'Complete beginner - never used it',
        'Basic understanding - heard about it',
        'Some experience - used it a few times',
        'Intermediate - comfortable with basics',
        'Advanced - use it regularly'
      ],
      type: 'experience'
    },
    {
      id: 2,
      question: `What is your primary goal for learning ${topicTitle}?`,
      options: [
        'Career advancement and job opportunities',
        'Personal projects and hobby development',
        'Academic requirements or coursework',
        'Staying updated with industry trends',
        'Building a specific application or solution'
      ],
      type: 'goal'
    },
    {
      id: 3,
      question: `How much time can you dedicate to learning ${topicTitle} per week?`,
      options: [
        '1-2 hours per week',
        '3-5 hours per week',
        '6-10 hours per week',
        '11-15 hours per week',
        'More than 15 hours per week'
      ],
      type: 'time'
    },
    {
      id: 4,
      question: `What is your preferred learning style?`,
      options: [
        'Hands-on coding and practical exercises',
        'Video tutorials and visual content',
        'Reading documentation and articles',
        'Interactive courses and guided projects',
        'Mix of all approaches'
      ],
      type: 'style'
    },
    {
      id: 5,
      question: `Which aspect of ${topicTitle} interests you most?`,
      options: [
        'Core fundamentals and theory',
        'Practical implementation and coding',
        'Real-world applications and use cases',
        'Advanced techniques and optimization',
        'Integration with other technologies'
      ],
      type: 'interest'
    }
  ];

  const [questions] = useState(generateQuestions(topic.title));

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer: selectedAnswer, type: questions[currentQuestion].type }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      generateLearningPath(newAnswers);
    }
  };

  const generateLearningPath = (assessmentAnswers) => {
    setIsGeneratingPath(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const experienceLevel = assessmentAnswers.find(a => a.type === 'experience')?.answer || 0;
      const timeCommitment = assessmentAnswers.find(a => a.type === 'time')?.answer || 0;
      const learningStyle = assessmentAnswers.find(a => a.type === 'style')?.answer || 0;
      
      const customPath = {
        topic: topic.title,
        difficulty: experienceLevel < 2 ? 'Beginner' : experienceLevel < 4 ? 'Intermediate' : 'Advanced',
        duration: timeCommitment < 2 ? '8-12 weeks' : timeCommitment < 4 ? '4-6 weeks' : '2-4 weeks',
        modules: generateModules(topic.title, experienceLevel),
        assessmentResults: assessmentAnswers
      };

      setIsGeneratingPath(false);
      onComplete(customPath);
    }, 3000);
  };

  const generateModules = (topicTitle, experienceLevel) => {
    const baseModules = [
      { id: 1, name: `${topicTitle} Fundamentals`, level: 1, estimated: '1-2 weeks' },
      { id: 2, name: 'Core Concepts', level: 1, estimated: '1-2 weeks' },
      { id: 3, name: 'Practical Applications', level: 2, estimated: '2-3 weeks' },
      { id: 4, name: 'Best Practices', level: 2, estimated: '1-2 weeks' },
      { id: 5, name: 'Advanced Techniques', level: 3, estimated: '2-3 weeks' },
      { id: 6, name: 'Real-world Projects', level: 3, estimated: '2-4 weeks' }
    ];

    // Filter based on experience level
    if (experienceLevel < 2) return baseModules;
    if (experienceLevel < 4) return baseModules.slice(2);
    return baseModules.slice(4);
  };

  if (showResult && isGeneratingPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Creating Your Learning Path</h2>
          <div className="flex items-center justify-center mb-6">
            <Loader className="w-6 h-6 text-primary-500 animate-spin mr-2" />
            <span className="text-gray-600">AI is analyzing your responses...</span>
          </div>
          <div className="space-y-2 text-left">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
              Analyzing experience level
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
              Determining learning objectives
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Loader className="w-4 h-4 text-primary-500 animate-spin mr-2" />
              Generating personalized modules
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

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
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentQ.question}</h2>
                <p className="text-gray-600">Choose the option that best describes you</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-5 h-5 text-primary-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Generate Learning Path
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIAssessment;