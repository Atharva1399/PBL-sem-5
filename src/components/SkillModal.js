import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, CheckCircle, ExternalLink, Video, FileText, Code } from 'lucide-react';

const SkillModal = ({ skill, onClose, onStartAssessment, onMarkComplete, isCompleted }) => {
  const resources = [
    { id: 1, title: 'Interactive Tutorial', type: 'tutorial', icon: Code, url: 'https://www.codecademy.com', duration: '2 hours' },
    { id: 2, title: 'Video Course', type: 'video', icon: Video, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '45 min' },
    { id: 3, title: 'Documentation', type: 'article', icon: FileText, url: 'https://developer.mozilla.org', duration: '15 min' },
    { id: 4, title: 'Practice Exercises', type: 'practice', icon: Code, url: 'https://www.freecodecamp.org', duration: '1 hour' },
    { id: 5, title: 'Advanced Guide', type: 'article', icon: FileText, url: 'https://www.w3schools.com', duration: '30 min' }
  ];

  const getResourceColor = (type) => {
    const colors = {
      video: 'bg-red-100 text-red-600',
      article: 'bg-blue-100 text-blue-600',
      tutorial: 'bg-green-100 text-green-600',
      practice: 'bg-purple-100 text-purple-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{skill.name}</h2>
              <p className="text-gray-600">Level {skill.level} • {skill.resources} resources</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Skill Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What you'll learn</h3>
            <p className="text-gray-600 leading-relaxed">
              Master the fundamentals of {skill.name.toLowerCase()} through hands-on practice and real-world examples. 
              This comprehensive module covers essential concepts, best practices, and practical applications 
              that will prepare you for the next level in your learning journey.
            </p>
          </div>

          {/* Learning Resources */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Resources</h3>
            <div className="space-y-3">
              {resources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <motion.div
                    key={resource.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => window.open(resource.url, '_blank')}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getResourceColor(resource.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{resource.title}</h4>
                        <p className="text-sm text-gray-500">{resource.duration}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {!isCompleted ? (
              <>
                <button
                  onClick={onStartAssessment}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Take Assessment
                </button>
                <button
                  onClick={onMarkComplete}
                  className="btn-secondary flex-1 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mark Complete
                </button>
              </>
            ) : (
              <div className="flex-1 bg-success-50 border border-success-200 text-success-700 py-3 px-6 rounded-xl text-center font-medium">
                <CheckCircle className="w-5 h-5 mr-2 inline" />
                Completed!
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillModal;