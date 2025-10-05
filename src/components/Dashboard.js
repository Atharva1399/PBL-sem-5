import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Flame, Trophy, Play, CheckCircle, Lock, LogOut, Settings } from 'lucide-react';
import SkillModal from './SkillModal';
import Assessment from './Assessment';

const Dashboard = ({ userProfile, onLogout, onShowProfile }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [completedSkills, setCompletedSkills] = useState(userProfile?.completedSkills || []);

  const roadmapData = {
    frontend: [
      { id: 1, name: 'HTML Basics', level: 1, prerequisite: null, resources: 5 },
      { id: 2, name: 'CSS Fundamentals', level: 1, prerequisite: 1, resources: 7 },
      { id: 3, name: 'JavaScript Basics', level: 2, prerequisite: 2, resources: 10 },
      { id: 4, name: 'DOM Manipulation', level: 2, prerequisite: 3, resources: 6 },
      { id: 5, name: 'React Fundamentals', level: 3, prerequisite: 4, resources: 12 },
      { id: 6, name: 'State Management', level: 3, prerequisite: 5, resources: 8 },
      { id: 7, name: 'React Router', level: 4, prerequisite: 6, resources: 5 },
      { id: 8, name: 'API Integration', level: 4, prerequisite: 7, resources: 9 }
    ],
    backend: [
      { id: 1, name: 'Python Basics', level: 1, prerequisite: null, resources: 8 },
      { id: 2, name: 'Data Structures', level: 2, prerequisite: 1, resources: 10 },
      { id: 3, name: 'Web Frameworks', level: 3, prerequisite: 2, resources: 12 },
      { id: 4, name: 'Database Design', level: 3, prerequisite: 2, resources: 9 },
      { id: 5, name: 'API Development', level: 4, prerequisite: 3, resources: 11 },
      { id: 6, name: 'Authentication', level: 4, prerequisite: 5, resources: 7 }
    ]
  };

  const currentRoadmap = roadmapData[userProfile?.goal?.id] || roadmapData.frontend;
  const totalSkills = currentRoadmap.length;
  const completedCount = completedSkills.length;
  const progressPercentage = (completedCount / totalSkills) * 100;

  const getSkillStatus = (skill) => {
    if (completedSkills.includes(skill.id)) return 'completed';
    if (!skill.prerequisite || completedSkills.includes(skill.prerequisite)) return 'current';
    return 'locked';
  };

  const handleSkillClick = (skill) => {
    const status = getSkillStatus(skill);
    if (status !== 'locked') {
      setSelectedSkill(skill);
    }
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setSelectedSkill(null);
  };

  const handleAssessmentComplete = (passed) => {
    if (passed && selectedSkill) {
      setCompletedSkills(prev => [...prev, selectedSkill.id]);
    }
    setShowAssessment(false);
  };

  const handleMarkComplete = () => {
    if (selectedSkill) {
      setCompletedSkills(prev => [...prev, selectedSkill.id]);
      setSelectedSkill(null);
    }
  };

  if (showAssessment) {
    return <Assessment skill={selectedSkill} onComplete={handleAssessmentComplete} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onShowProfile}
                className="w-12 h-12 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center hover:ring-4 hover:ring-primary-100 transition-all"
              >
                {userProfile?.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Welcome back, {userProfile?.name}!</h1>
                <p className="text-gray-600">{userProfile?.goal?.title} Path</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-800">{userProfile?.streak || 0} day streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-800">{completedCount} skills mastered</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onShowProfile}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Profile Settings"
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-500" />
                </button>
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
          <p className="text-gray-600">{completedCount} of {totalSkills} skills completed</p>
        </div>

        {/* Roadmap */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Learning Roadmap</h2>
          <div className="relative">
            {/* Roadmap Path */}
            <div className="flex flex-col items-center space-y-8">
              {currentRoadmap.map((skill, index) => {
                const status = getSkillStatus(skill);
                const isLast = index === currentRoadmap.length - 1;
                
                return (
                  <div key={skill.id} className="flex flex-col items-center">
                    <motion.div
                      whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
                      whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
                      onClick={() => handleSkillClick(skill)}
                      className={`skill-node ${
                        status === 'completed' ? 'skill-node-completed' :
                        status === 'current' ? 'skill-node-current' :
                        'skill-node-locked'
                      }`}
                    >
                      {status === 'completed' && <CheckCircle className="w-8 h-8" />}
                      {status === 'current' && <Play className="w-8 h-8" />}
                      {status === 'locked' && <Lock className="w-8 h-8" />}
                    </motion.div>
                    
                    <div className="text-center mt-3 mb-4">
                      <h3 className={`font-semibold ${
                        status === 'locked' ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-500">Level {skill.level}</p>
                    </div>
                    
                    {!isLast && (
                      <div className={`w-1 h-12 ${
                        completedSkills.includes(skill.id) ? 'bg-success-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onStartAssessment={handleStartAssessment}
          onMarkComplete={handleMarkComplete}
          isCompleted={completedSkills.includes(selectedSkill.id)}
        />
      )}
    </div>
  );
};

export default Dashboard;