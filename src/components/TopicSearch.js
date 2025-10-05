import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Brain, ArrowRight, Loader } from 'lucide-react';

const TopicSearch = ({ onTopicSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const mockTopics = [
    { id: 1, title: 'Machine Learning', category: 'AI/ML', difficulty: 'Intermediate' },
    { id: 2, title: 'React Hooks', category: 'Frontend', difficulty: 'Beginner' },
    { id: 3, title: 'Node.js APIs', category: 'Backend', difficulty: 'Intermediate' },
    { id: 4, title: 'Docker Containers', category: 'DevOps', difficulty: 'Advanced' },
    { id: 5, title: 'Python Basics', category: 'Programming', difficulty: 'Beginner' },
    { id: 6, title: 'Data Structures', category: 'Computer Science', difficulty: 'Intermediate' }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What do you want to learn?</h2>
        <p className="text-lg text-gray-600">Search for any topic and get a personalized learning path</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="flex">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for topics like 'Machine Learning', 'React', 'Python'..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="btn-primary px-8 rounded-l-none rounded-r-xl disabled:opacity-50"
          >
            {isSearching ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </div>
      </div>

      {/* Popular Topics */}
      {searchResults.length === 0 && !isSearching && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Topics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTopics.slice(0, 6).map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <div className="space-y-4">
            {searchResults.map((topic) => (
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
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && searchQuery && !isSearching && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No topics found</h3>
          <p className="text-gray-500">Try searching for something else or browse popular topics above</p>
        </div>
      )}
    </div>
  );
};

export default TopicSearch;