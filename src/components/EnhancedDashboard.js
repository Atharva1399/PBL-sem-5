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

  const handleEnrollCourse = (course) => {
    if (!enrolledCourses.includes(course.id)) {
      setEnrolledCourses(prev => [...prev, course.id]);
      setNotification(`Successfully enrolled in ${course.title}!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleMarkSkillComplete = (skillId) => {
    setCompletedSkills(prev => [...prev, skillId]);
    setNotification('Skill marked as completed!');
    setTimeout(() => setNotification(null), 3000);
    setSelectedSkill(null);
  };

  const availableCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      rating: 4.7,
      students: 850000,
      duration: '65 hours',
      level: 'Beginner',
      price: 84.99,
      category: 'Web Development',
      image: 'https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg',
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    },
    {
      id: 2,
      title: 'Machine Learning A-Z',
      instructor: 'Kirill Eremenko',
      rating: 4.5,
      students: 500000,
      duration: '44 hours',
      level: 'Intermediate',
      price: 94.99,
      category: 'Data Science',
      image: 'https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg',
      skills: ['Python', 'R', 'Machine Learning', 'Data Science']
    },
    {
      id: 3,
      title: 'React - The Complete Guide',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.6,
      students: 400000,
      duration: '48 hours',
      level: 'Intermediate',
      price: 89.99,
      category: 'Web Development',
      image: 'https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg',
      skills: ['React', 'Redux', 'JavaScript', 'Hooks']
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Jose Portilla',
      rating: 4.6,
      students: 300000,
      duration: '25 hours',
      level: 'Beginner',
      price: 79.99,
      category: 'Data Science',
      image: 'https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
    },
    {
      id: 5,
      title: 'AWS Certified Solutions Architect',
      instructor: 'Stephane Maarek',
      rating: 4.7,
      students: 600000,
      duration: '27 hours',
      level: 'Advanced',
      price: 99.99,
      category: 'DevOps',
      image: 'https://img-c.udemycdn.com/course/240x135/362070_d819_2.jpg',
      skills: ['AWS', 'Cloud Computing', 'Architecture']
    },
    {
      id: 6,
      title: 'Docker & Kubernetes Complete Guide',
      instructor: 'Stephen Grider',
      rating: 4.6,
      students: 200000,
      duration: '22 hours',
      level: 'Advanced',
      price: 89.99,
      category: 'DevOps',
      image: 'https://img-c.udemycdn.com/course/240x135/1793828_2f35_5.jpg',
      skills: ['Docker', 'Kubernetes', 'DevOps']
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Course Categories */}
      <div className="flex flex-wrap gap-4 mb-6">
        {['All', 'Web Development', 'Data Science', 'Mobile Development', 'DevOps', 'Design'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === selectedCategory 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Available Courses */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.filter(course => 
            selectedCategory === 'All' || course.category === selectedCategory
          ).map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="card overflow-hidden cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-r from-primary-500 to-blue-600 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {(course.students / 1000).toFixed(0)}k students
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{course.skills.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">${course.price}</span>
                  <button 
                    onClick={() => handleEnrollCourse(course)}
                    disabled={enrolledCourses.includes(course.id)}
                    className={`text-sm py-2 px-4 rounded-lg font-medium transition-colors ${
                      enrolledCourses.includes(course.id)
                        ? 'bg-success-100 text-success-700 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    {enrolledCourses.includes(course.id) ? 'Enrolled' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoadmap = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const status = getSkillStatus(skill);
          return (
            <motion.div
              key={skill.id}
              whileHover={{ scale: status !== 'locked' ? 1.02 : 1 }}
              onClick={() => handleSkillClick(skill)}
              className={`card p-6 cursor-pointer transition-all ${
                status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status === 'completed' ? 'bg-success-500' :
                  status === 'current' ? 'bg-primary-500' : 'bg-gray-300'
                }`}>
                  {status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                  {status === 'current' && <Play className="w-6 h-6 text-white" />}
                  {status === 'locked' && <Lock className="w-6 h-6 text-white" />}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  skill.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  skill.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {skill.difficulty}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{skill.category}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {skill.estimatedHours}h
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {skill.resources} resources
                </div>
              </div>

              {status === 'current' && (
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkillClick(skill);
                    }}
                    className="btn-secondary text-sm py-2 px-3 flex-1"
                  >
                    Learn
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartCoding(skill);
                    }}
                    className="btn-primary text-sm py-2 px-3 flex-1"
                  >
                    Code
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
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
              { id: 'overview', label: 'Courses', icon: BookOpen },
              { id: 'roadmap', label: 'Learning Path', icon: Target },
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
        {activeTab === 'roadmap' && renderRoadmap()}
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