import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Star, Play } from 'lucide-react';

const TopicOverview = ({ topic, onBack, onStartAssessment }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI-generated content
  const topicData = {
    definition: `${topic.title} is a fundamental concept in ${topic.category.toLowerCase()} that involves understanding core principles and practical applications. This technology/concept is widely used in modern development and is essential for building scalable solutions.`,
    keyPoints: [
      `Core concepts and fundamentals of ${topic.title}`,
      'Practical applications and real-world use cases',
      'Best practices and industry standards',
      'Common challenges and how to overcome them',
      'Integration with other technologies and tools'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of fundamental concepts',
      'Familiarity with development tools'
    ],
    learningTime: '4-6 weeks',
    difficulty: topic.difficulty,
    popularity: '95% of developers recommend this'
  };

  const handleStartAssessment = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStartAssessment(topic);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{topic.title}</h1>
          <p className="text-lg text-gray-600">{topic.category}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Definition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary-500" />
              What is {topic.title}?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">{topicData.definition}</p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Learning Points:</h3>
            <ul className="space-y-2">
              {topicData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <Star className="w-4 h-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Prerequisites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Prerequisites</h2>
            <div className="space-y-2">
              {topicData.prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{prereq}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Duration</span>
                </div>
                <span className="font-medium text-gray-800">{topicData.learningTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Difficulty</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  topicData.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  topicData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {topicData.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Popularity</span>
                </div>
                <span className="font-medium text-gray-800">High</span>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ready to Start?</h3>
            <p className="text-gray-600 mb-6">Take a quick assessment to create your personalized learning path</p>
            <button
              onClick={handleStartAssessment}
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Play className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Preparing Assessment...' : 'Start Assessment'}
            </button>
          </motion.div>

          {/* AI Notice */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-4"
          >
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h4 className="font-medium text-primary-800 mb-1">AI-Powered Learning</h4>
                <p className="text-sm text-primary-700">
                  This content and your learning path will be personalized based on your assessment results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopicOverview;