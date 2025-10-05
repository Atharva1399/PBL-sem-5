import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Flame, Trophy, Play, CheckCircle, Lock, Clock, BookOpen, 
  TrendingUp, Calendar, Target, Award, Star, BarChart3, 
  Settings, LogOut, Search, Filter, ChevronRight, Code, Brain, Loader
} from 'lucide-react';
import SkillModal from './SkillModal';
import Assessment from './Assessment';

const EnhancedDashboard = ({ userProfile, onLogout, onShowProfile, onStartCoding, onTopicSelect }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [completedSkills, setCompletedSkills] = useState(userProfile?.completedSkills || []);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [notification, setNotification] = useState(null);

  const roadmapData = {
    frontend: [
      { id: 1, name: 'HTML Basics', level: 1, prerequisite: null, resources: 5, difficulty: 'Beginner', estimatedHours: 8, category: 'Markup' },
      { id: 2, name: 'CSS Fundamentals', level: 1, prerequisite: 1, resources: 7, difficulty: 'Beginner', estimatedHours: 12, category: 'Styling' },
      { id: 3, name: 'JavaScript Basics', level: 2, prerequisite: 2, resources: 10, difficulty: 'Intermediate', estimatedHours: 20, category: 'Programming' },
      { id: 4, name: 'DOM Manipulation', level: 2, prerequisite: 3, resources: 6, difficulty: 'Intermediate', estimatedHours: 15, category: 'Programming' },
      { id: 5, name: 'React Fundamentals', level: 3, prerequisite: 4, resources: 12, difficulty: 'Intermediate', estimatedHours: 25, category: 'Framework' },
      { id: 6, name: 'State Management', level: 3, prerequisite: 5, resources: 8, difficulty: 'Advanced', estimatedHours: 18, category: 'Framework' },
      { id: 7, name: 'React Router', level: 4, prerequisite: 6, resources: 5, difficulty: 'Advanced', estimatedHours: 10, category: 'Framework' },
      { id: 8, name: 'API Integration', level: 4, prerequisite: 7, resources: 9, difficulty: 'Advanced', estimatedHours: 16, category: 'Integration' }
    ]
  };

  const currentRoadmap = roadmapData[userProfile?.goal?.id] || roadmapData.frontend;
  const totalSkills = currentRoadmap.length;
  const completedCount = completedSkills.length;
  const progressPercentage = (completedCount / totalSkills) * 100;

  // Analytics data
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, completed: 1 },
    { day: 'Tue', hours: 3.2, completed: 0 },
    { day: 'Wed', hours: 1.8, completed: 2 },
    { day: 'Thu', hours: 4.1, completed: 1 },
    { day: 'Fri', hours: 2.9, completed: 0 },
    { day: 'Sat', hours: 5.2, completed: 3 },
    { day: 'Sun', hours: 3.8, completed: 1 }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first skill', icon: Trophy, earned: true, date: '2024-01-15' },
    { id: 2, title: 'Week Warrior', description: '7-day learning streak', icon: Flame, earned: true, date: '2024-01-20' },
    { id: 3, title: 'Code Master', description: 'Solved 10 coding problems', icon: Code, earned: false, progress: 7 },
    { id: 4, title: 'Knowledge Seeker', description: 'Completed 5 assessments', icon: Brain, earned: false, progress: 3 }
  ];

  const mockTopics = [
    { id: 1, title: 'Machine Learning', category: 'AI/ML', difficulty: 'Intermediate' },
    { id: 2, title: 'React Hooks', category: 'Frontend', difficulty: 'Beginner' },
    { id: 3, title: 'Node.js APIs', category: 'Backend', difficulty: 'Intermediate' },
    { id: 4, title: 'Docker Containers', category: 'DevOps', difficulty: 'Advanced' },
    { id: 5, title: 'Python Basics', category: 'Programming', difficulty: 'Beginner' },
    { id: 6, title: 'Data Structures', category: 'Computer Science', difficulty: 'Intermediate' }
  ];

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

  const filteredSkills = currentRoadmap.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterDifficulty === 'all' || skill.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAiSearch = async () => {
    if (!aiSearchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const filtered = mockTopics.filter(topic => 
        topic.title.toLowerCase().includes(aiSearchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(aiSearchQuery.toLowerCase())
      );
      setAiSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const handleSelectJobRole = (role) => {
    setNotification(`Starting assessment for ${role.title}...`);
    setTimeout(() => setNotification(null), 3000);
    // This would trigger the assessment flow
    onStartCoding({ ...role, type: 'job-assessment' });
  };

  const handleMarkSkillComplete = (skillId) => {
    setCompletedSkills(prev => [...prev, skillId]);
    setNotification('Skill marked as completed!');
    setTimeout(() => setNotification(null), 3000);
    setSelectedSkill(null);
  };

  const jobRoles = [
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description: 'Master both frontend and backend development',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases', 'APIs'],
      averageSalary: '$85,000',
      demandLevel: 'High',
      timeToComplete: '6-8 months'
    },
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'Create beautiful and interactive user interfaces',
      icon: BookOpen,
      color: 'from-green-500 to-blue-500',
      skills: ['HTML/CSS', 'JavaScript', 'React/Vue', 'UI/UX', 'Responsive Design'],
      averageSalary: '$75,000',
      demandLevel: 'High',
      timeToComplete: '4-6 months'
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      description: 'Build robust server-side applications and APIs',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      skills: ['Node.js/Python', 'Databases', 'APIs', 'Cloud Services', 'Security'],
      averageSalary: '$90,000',
      demandLevel: 'Very High',
      timeToComplete: '5-7 months'
    },
    {
      id: 'mobile',
      title: 'Mobile App Developer',
      description: 'Develop native and cross-platform mobile applications',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      skills: ['React Native/Flutter', 'iOS/Android', 'Mobile UI/UX', 'App Store'],
      averageSalary: '$80,000',
      demandLevel: 'High',
      timeToComplete: '5-7 months'
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      description: 'Streamline development and deployment processes',
      icon: Settings,
      color: 'from-teal-500 to-green-500',
      skills: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD', 'Monitoring'],
      averageSalary: '$95,000',
      demandLevel: 'Very High',
      timeToComplete: '6-9 months'
    },
    {
      id: 'datascience',
      title: 'Data Scientist',
      description: 'Extract insights from data using ML and analytics',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      skills: ['Python/R', 'Machine Learning', 'Statistics', 'Data Visualization'],
      averageSalary: '$100,000',
      demandLevel: 'Very High',
      timeToComplete: '8-12 months'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Job Role Learning Paths */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Career Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a job role to get a personalized learning roadmap with AI-generated content based on your assessment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobRoles.map((role) => {
            const IconComponent = role.icon;
            return (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => handleSelectJobRole(role)}
              >
                <div className={`h-32 bg-gradient-to-r ${role.color} flex items-center justify-center relative overflow-hidden`}>
                  <IconComponent className="w-16 h-16 text-white z-10" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{role.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      role.demandLevel === 'Very High' ? 'bg-red-100 text-red-700' :
                      role.demandLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {role.demandLevel} Demand
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Average Salary:</span>
                      <span className="font-semibold text-green-600">{role.averageSalary}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Time to Complete:</span>
                      <span className="font-semibold text-gray-700">{role.timeToComplete}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {role.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{role.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary group-hover:shadow-lg transition-shadow">
                    Start Assessment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );



  if (showAssessment) {
    return <Assessment skill={selectedSkill} onComplete={(passed) => {
      if (passed && selectedSkill) {
        setCompletedSkills(prev => [...prev, selectedSkill.id]);
      }
      setShowAssessment(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
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
                <p className="text-gray-600">{userProfile?.goal?.title} Learning Path</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-800">{userProfile?.streak || 0} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800">{completedCount} skills mastered</span>
                </div>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Learning Path', icon: BookOpen },
              { id: 'ai-search', label: 'AI Search', icon: Brain },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'ai-search' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI-Powered Topic Search</h3>
              <div className="flex">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={aiSearchQuery}
                    onChange={(e) => setAiSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                    placeholder="Search for topics like 'Machine Learning', 'React', 'Python'..."
                    className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleAiSearch}
                  disabled={isSearching || !aiSearchQuery.trim()}
                  className="btn-primary px-8 rounded-l-none rounded-r-xl disabled:opacity-50"
                >
                  {isSearching ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
                </button>
              </div>
            </div>
            {aiSearchResults.length === 0 && !isSearching && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Topics</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTopics.slice(0, 6).map((topic) => (
                    <motion.div
                      key={topic.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onTopicSelect(topic)}
                      className="card p-4 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{topic.title}</h4>
                        <BookOpen className="w-5 h-5 text-primary-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{topic.category}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {aiSearchResults.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results ({aiSearchResults.length})</h3>
                <div className="space-y-4">
                  {aiSearchResults.map((topic) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => onTopicSelect(topic)}
                      className="card p-6 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{topic.title}</h4>
                          <p className="text-gray-600">{topic.category}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div key={achievement.id} className={`card p-6 ${
                  achievement.earned ? 'border-success-200 bg-success-50' : ''
                }`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-success-500' : 'bg-gray-400'
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                      {achievement.earned && (
                        <p className="text-sm text-success-600">Earned {achievement.date}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${(achievement.progress / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{achievement.progress}/10 completed</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {notification}
        </motion.div>
      )}

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onStartAssessment={() => setShowAssessment(true)}
          onMarkComplete={() => handleMarkSkillComplete(selectedSkill.id)}
          isCompleted={completedSkills.includes(selectedSkill.id)}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;