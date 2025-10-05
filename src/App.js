import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import OnboardingFlow from './components/OnboardingFlow';
import Dashboard from './components/Dashboard';
import EnhancedDashboard from './components/EnhancedDashboard';
import UserProfile from './components/UserProfile';
import TopicSearch from './components/TopicSearch';
import TopicOverview from './components/TopicOverview';
import AIAssessment from './components/AIAssessment';
import CustomRoadmap from './components/CustomRoadmap';
import CodingAssessment from './components/CodingAssessment';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customLearningPath, setCustomLearningPath] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);

  const handleAuth = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    // Create a basic profile for immediate dashboard access
    const basicProfile = {
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      goal: { id: 'frontend', title: 'Frontend Developer' },
      streak: 5,
      completedSkills: [1, 2]
    };
    setUserProfile(basicProfile);
    setCurrentView('dashboard');
  };

  const handleOnboardingComplete = (profile) => {
    setUserProfile({ ...profile, ...user });
    setCurrentView('dashboard');
  };

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setSelectedTopic(null);
    setCustomLearningPath(null);
    setCurrentView('landing');
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('topic-overview');
  };

  const handleStartAssessment = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('ai-assessment');
  };

  const handleAssessmentComplete = (learningPath) => {
    setCustomLearningPath(learningPath);
    setCurrentView('custom-roadmap');
  };

  const handleBackToSearch = () => {
    setSelectedTopic(null);
    setCurrentView('topic-search');
  };

  const handleBackToOverview = () => {
    setCurrentView('topic-overview');
  };

  const handleStartModule = (module) => {
    // Handle module start - could open learning content
    console.log('Starting module:', module);
  };

  const handleStartCoding = (module) => {
    setCurrentModule(module);
    setCurrentView('coding-assessment');
  };

  const handleCodingComplete = (passed) => {
    if (passed) {
      // Mark module as completed
      console.log('Coding assessment completed for:', currentModule);
    }
    setCurrentView('custom-roadmap');
  };

  const handleBackToRoadmap = () => {
    setCurrentView('custom-roadmap');
  };

  const userStats = {
    streak: userProfile?.streak || 0,
    completed: userProfile?.completedSkills?.length || 0,
    inProgress: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'landing' && (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
      
      {currentView === 'topic-search' && (
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">AI-Powered Learning</h1>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="btn-secondary"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setShowProfile(true)}
                  className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium"
                >
                  {user?.name?.[0] || 'U'}
                </button>
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
              </div>
            </div>
          </header>
          <TopicSearch onTopicSelect={handleTopicSelect} />
        </div>
      )}

      {currentView === 'topic-overview' && selectedTopic && (
        <TopicOverview 
          topic={selectedTopic}
          onBack={handleBackToSearch}
          onStartAssessment={handleStartAssessment}
        />
      )}

      {currentView === 'ai-assessment' && selectedTopic && (
        <AIAssessment 
          topic={selectedTopic}
          onComplete={handleAssessmentComplete}
        />
      )}

      {currentView === 'custom-roadmap' && customLearningPath && (
        <CustomRoadmap 
          learningPath={customLearningPath}
          onBack={handleBackToSearch}
          onStartModule={handleStartModule}
          onStartCoding={handleStartCoding}
        />
      )}

      {currentView === 'coding-assessment' && currentModule && (
        <CodingAssessment 
          module={currentModule}
          onBack={handleBackToRoadmap}
          onComplete={handleCodingComplete}
        />
      )}
      
      {currentView === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {currentView === 'dashboard' && (
        <EnhancedDashboard 
          userProfile={userProfile} 
          onLogout={handleLogout}
          onShowProfile={() => setShowProfile(true)}
          onStartCoding={handleStartCoding}
          onTopicSelect={handleTopicSelect}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onAuth={handleAuth}
        />
      )}

      {showProfile && user && (
        <UserProfile
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdateProfile={handleUpdateProfile}
          stats={userStats}
        />
      )}
    </div>
  );
}

export default App;