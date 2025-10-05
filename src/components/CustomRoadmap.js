import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play, Lock, Clock, BookOpen, Trophy, ArrowLeft, Code } from 'lucide-react';

const CustomRoadmap = ({ learningPath, onBack, onStartModule, onStartCoding }) => {
  const [completedModules, setCompletedModules] = useState([]);

  const getModuleStatus = (module) => {
    if (completedModules.includes(module.id)) return 'completed';
    if (module.id === 1 || completedModules.includes(module.id - 1)) return 'current';
    return 'locked';
  };

  const handleModuleClick = (module) => {
    const status = getModuleStatus(module);
    if (status !== 'locked') {
      onStartModule(module);
    }
  };

  const handleMarkComplete = (moduleId) => {
    setCompletedModules(prev => [...prev, moduleId]);
  };

  const progressPercentage = (completedModules.length / learningPath.modules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{learningPath.topic} Learning Path</h1>
                <p className="text-gray-600">AI-Generated • {learningPath.difficulty} Level • {learningPath.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-800">{completedModules.length} modules completed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
            <span className="text-3xl font-bold text-primary-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-gray-600">{completedModules.length} of {learningPath.modules.length} modules completed</p>
        </div>

        {/* AI Insights */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white text-lg font-bold">AI</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Personalized Learning Path</h3>
              <p className="text-primary-700 mb-4">
                Based on your assessment, this path is tailored for your {learningPath.difficulty.toLowerCase()} level 
                and focuses on practical applications. Estimated completion time: {learningPath.duration}.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {learningPath.difficulty} Level
                </span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {learningPath.duration}
                </span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {learningPath.modules.length} Modules
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Learning Modules</h2>
          <div className="relative">
            <div className="flex flex-col items-center space-y-8">
              {learningPath.modules.map((module, index) => {
                const status = getModuleStatus(module);
                const isLast = index === learningPath.modules.length - 1;
                
                return (
                  <div key={module.id} className="flex flex-col items-center w-full max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                        {/* Module Icon */}
                        <motion.div
                          whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
                          whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
                          onClick={() => handleModuleClick(module)}
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all cursor-pointer ${
                            status === 'completed' ? 'bg-success-500 text-white shadow-lg' :
                            status === 'current' ? 'bg-primary-500 text-white shadow-lg animate-pulse-slow' :
                            'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {status === 'completed' && <CheckCircle className="w-8 h-8" />}
                          {status === 'current' && <Play className="w-8 h-8" />}
                          {status === 'locked' && <Lock className="w-8 h-8" />}
                        </motion.div>

                        {/* Module Info */}
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold mb-2 ${
                            status === 'locked' ? 'text-gray-400' : 'text-gray-800'
                          }`}>
                            {module.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              Level {module.level}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.estimated}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {status === 'current' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleModuleClick(module)}
                              className="btn-secondary flex items-center"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Learn
                            </button>
                            <button
                              onClick={() => onStartCoding(module)}
                              className="btn-primary flex items-center"
                            >
                              <Code className="w-4 h-4 mr-2" />
                              Code
                            </button>
                          </div>
                        )}
                        {status === 'completed' && (
                          <div className="flex items-center text-success-600 font-medium">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Completed
                          </div>
                        )}
                      </div>
                    </motion.div>
                    
                    {!isLast && (
                      <div className={`w-1 h-12 ${
                        completedModules.includes(module.id) ? 'bg-success-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {completedModules.length === learningPath.modules.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 text-center bg-gradient-to-r from-success-50 to-green-50 border border-success-200 mt-8"
          >
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-success-800 mb-4">Congratulations!</h2>
            <p className="text-success-700 text-lg">
              You've completed your {learningPath.topic} learning path! 
              You're now ready to apply your knowledge in real-world projects.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomRoadmap;