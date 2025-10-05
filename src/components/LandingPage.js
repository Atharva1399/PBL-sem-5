import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Trophy, BookOpen, ArrowRight, Play } from 'lucide-react';

const LandingPage = ({ onLogin, onSignup }) => {
  const features = [
    { icon: BookOpen, title: 'Personalized Learning', desc: 'Tailored roadmaps for your career goals' },
    { icon: Trophy, title: 'Gamified Progress', desc: 'Earn achievements and track streaks' },
    { icon: Users, title: 'Expert Curated', desc: 'Content reviewed by industry professionals' },
    { icon: Star, title: 'Interactive Assessments', desc: 'Test your knowledge with instant feedback' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">LearnPath</span>
          </div>
          <div className="space-x-4">
            <button onClick={onLogin} className="btn-secondary">Login</button>
            <button onClick={onSignup} className="btn-primary">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            Master Skills with
            <span className="text-primary-500"> Personalized Roadmaps</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Transform your learning journey with gamified, step-by-step roadmaps designed to take you from beginner to expert in your chosen field.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <button onClick={onSignup} className="btn-primary text-lg px-8 py-4">
              Start Learning <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose LearnPath?</h2>
          <p className="text-lg text-gray-600">Everything you need to accelerate your learning</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of learners already advancing their careers</p>
          <button onClick={onSignup} className="bg-white text-primary-500 hover:bg-gray-100 font-medium py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;