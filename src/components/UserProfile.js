import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Calendar, Trophy, Flame, BookOpen, Edit2, Save } from 'lucide-react';

const UserProfile = ({ user, onClose, onUpdateProfile, stats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || 'Learning enthusiast on a journey to master new skills!'
  });

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isEditing ? <Save className="w-5 h-5 text-primary-500" /> : <Edit2 className="w-5 h-5 text-gray-500" />}
              </button>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:border-primary-500 outline-none bg-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full text-gray-600 border-b border-gray-300 focus:border-primary-500 outline-none bg-transparent"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-gray-500 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">About</h4>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{user.bio || formData.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary-600">{stats?.streak || 0}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            
            <div className="text-center p-4 bg-success-50 rounded-xl">
              <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-success-600">{stats?.completed || 0}</div>
              <div className="text-sm text-gray-600">Skills Mastered</div>
            </div>
            
            <div className="text-center p-4 bg-warning-50 rounded-xl">
              <div className="w-12 h-12 bg-warning-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-warning-600">{stats?.inProgress || 1}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>

          {/* Learning Analytics */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Learning Analytics</h4>
            
            {/* Weekly Progress Chart */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h5 className="font-medium text-gray-800 mb-3">Weekly Activity</h5>
              <div className="flex items-end justify-between h-24 space-x-2">
                {[
                  { day: 'Mon', hours: 2.5 },
                  { day: 'Tue', hours: 3.2 },
                  { day: 'Wed', hours: 1.8 },
                  { day: 'Thu', hours: 4.1 },
                  { day: 'Fri', hours: 2.9 },
                  { day: 'Sat', hours: 5.2 },
                  { day: 'Sun', hours: 3.8 }
                ].map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '60px' }}>
                      <div
                        className="bg-primary-500 rounded-t absolute bottom-0 w-full"
                        style={{ height: `${(day.hours / 6) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{day.day}</p>
                    <p className="text-xs font-medium text-gray-800">{day.hours}h</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-primary-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">85%</div>
                <div className="text-sm text-primary-700">Avg. Score</div>
              </div>
              <div className="bg-success-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-success-600">23h</div>
                <div className="text-sm text-success-700">This Week</div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-success-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">First Skill Completed!</p>
                  <p className="text-sm text-gray-600">Completed your first learning module</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Learning Streak Started</p>
                  <p className="text-sm text-gray-600">Keep up the momentum!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;