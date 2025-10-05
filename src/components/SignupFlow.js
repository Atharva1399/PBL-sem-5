import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Mail, Lock, Briefcase, GraduationCap, Code, Building } from 'lucide-react';

const SignupFlow = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Profile Questions
    experience: '',
    fieldOfInterest: '',
    currentStatus: '',
    goals: [],
    learningStyle: ''
  });

  const steps = [
    {
      title: 'Create Account',
      subtitle: 'Let\'s get you started',
      component: BasicInfoStep
    },
    {
      title: 'Tell Us About You',
      subtitle: 'Help us personalize your experience',
      component: ProfileStep
    },
    {
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      component: GoalsStep
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              isLastStep={currentStep === steps.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Basic Info Step
const BasicInfoStep = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Create a password"
          />
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Confirm your password"
          />
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 inline mr-2" />
          Back
        </button>
        <button
          type="submit"
          className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-lg hover:from-primary-600 hover:to-blue-700 transition-colors"
        >
          Next
          <ArrowRight className="w-4 h-4 inline ml-2" />
        </button>
      </div>
    </form>
  );
};

// Profile Step
const ProfileStep = ({ formData, updateFormData, onNext, onPrev }) => {
  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', desc: 'New to programming' },
    { id: 'intermediate', label: 'Intermediate', desc: '1-3 years experience' },
    { id: 'advanced', label: 'Advanced', desc: '3+ years experience' }
  ];

  const fields = [
    { id: 'frontend', label: 'Frontend Development', icon: Code },
    { id: 'backend', label: 'Backend Development', icon: Building },
    { id: 'fullstack', label: 'Full Stack Development', icon: GraduationCap },
    { id: 'mobile', label: 'Mobile Development', icon: Code },
    { id: 'devops', label: 'DevOps', icon: Building },
    { id: 'data', label: 'Data Science', icon: GraduationCap }
  ];

  const statusOptions = [
    { id: 'student', label: 'Student', desc: 'Currently studying' },
    { id: 'working', label: 'Working Professional', desc: 'Currently employed' },
    { id: 'freelancer', label: 'Freelancer', desc: 'Working independently' },
    { id: 'unemployed', label: 'Looking for Work', desc: 'Seeking opportunities' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">What's your experience level?</label>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <motion.div
              key={level.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.experience === level.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => updateFormData({ experience: level.id })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-gray-800">{level.label}</div>
              <div className="text-sm text-gray-600">{level.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Field of Interest</label>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field) => {
            const IconComponent = field.icon;
            return (
              <motion.div
                key={field.id}
                className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                  formData.fieldOfInterest === field.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => updateFormData({ fieldOfInterest: field.id })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                <div className="text-sm font-medium text-gray-800">{field.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Current Status</label>
        <div className="space-y-3">
          {statusOptions.map((status) => (
            <motion.div
              key={status.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.currentStatus === status.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => updateFormData({ currentStatus: status.id })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-gray-800">{status.label}</div>
              <div className="text-sm text-gray-600">{status.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 inline mr-2" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.experience || !formData.fieldOfInterest || !formData.currentStatus}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-lg hover:from-primary-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="w-4 h-4 inline ml-2" />
        </button>
      </div>
    </div>
  );
};

// Goals Step
const GoalsStep = ({ formData, updateFormData, onNext, onPrev, isLastStep }) => {
  const goalOptions = [
    'Get my first job in tech',
    'Switch to a new career',
    'Get promoted at work',
    'Start freelancing',
    'Build my own startup',
    'Learn new technologies'
  ];

  const toggleGoal = (goal) => {
    const currentGoals = formData.goals || [];
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    updateFormData({ goals: updatedGoals });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">What are your goals? (Select all that apply)</label>
        <div className="space-y-3">
          {goalOptions.map((goal) => (
            <motion.div
              key={goal}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.goals?.includes(goal)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => toggleGoal(goal)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded border-2 mr-3 ${
                  formData.goals?.includes(goal)
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300'
                }`}>
                  {formData.goals?.includes(goal) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="text-gray-800">{goal}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 inline mr-2" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.goals?.length}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-lg hover:from-primary-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? 'Complete Setup' : 'Next'}
          <ArrowRight className="w-4 h-4 inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SignupFlow;