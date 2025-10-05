import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Database, Palette, Brain, Star } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [skillRatings, setSkillRatings] = useState({});

  const careerPaths = [
    { id: 'frontend', title: 'Frontend Developer', icon: Code, color: 'bg-blue-500', skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX'] },
    { id: 'backend', title: 'Backend Developer', icon: Database, color: 'bg-green-500', skills: ['Python', 'APIs', 'Databases', 'Server Management'] },
    { id: 'fullstack', title: 'Full Stack Developer', icon: Brain, color: 'bg-purple-500', skills: ['Frontend', 'Backend', 'DevOps', 'System Design'] },
    { id: 'designer', title: 'UI/UX Designer', icon: Palette, color: 'bg-pink-500', skills: ['Design Principles', 'Figma', 'User Research', 'Prototyping'] }
  ];

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setCurrentStep(2);
  };

  const handleSkillRating = (skill, rating) => {
    setSkillRatings(prev => ({ ...prev, [skill]: rating }));
  };

  const handleComplete = () => {
    onComplete({
      goal: selectedGoal,
      skillRatings,
      streak: 0,
      completedSkills: []
    });
  };

  const steps = [
    // Welcome Screen
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Learning Journey!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Build your skills step by step with personalized roadmaps designed just for you.
        </p>
      </div>
      <button
        onClick={() => setCurrentStep(1)}
        className="btn-primary text-lg px-8 py-4"
      >
        Get Started <ArrowRight className="w-5 h-5 ml-2 inline" />
      </button>
    </motion.div>,

    // Goal Selection
    <motion.div
      key="goals"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Path</h2>
        <p className="text-lg text-gray-600">What would you like to become?</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {careerPaths.map((path) => {
          const IconComponent = path.icon;
          return (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGoalSelect(path)}
              className="card p-6 cursor-pointer"
            >
              <div className={`w-16 h-16 ${path.color} rounded-2xl flex items-center justify-center mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{path.title}</h3>
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>,

    // Self Assessment
    <motion.div
      key="assessment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Rate Your Current Skills</h2>
        <p className="text-lg text-gray-600">Help us personalize your learning path</p>
      </div>
      <div className="space-y-6">
        {selectedGoal?.skills.map((skill) => (
          <div key={skill} className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{skill}</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSkillRating(skill, rating)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    skillRatings[skill] >= rating
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-gray-300 text-gray-400 hover:border-primary-300'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={handleComplete}
          disabled={Object.keys(skillRatings).length !== selectedGoal?.skills.length}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Learning Journey <ArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </motion.div>
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {steps[currentStep]}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;