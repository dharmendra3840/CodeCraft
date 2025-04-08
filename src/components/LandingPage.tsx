import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Brain, Trophy, Users, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-6xl font-bold mb-6"
              >
                Master Python with
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}CodeCraft
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-300 text-xl mb-8"
              >
                Interactive learning platform that makes coding fun and engaging.
                Start your journey to becoming a Python expert today!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 group">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-gray-600 hover:border-gray-500 px-8 py-3 rounded-lg font-medium">
                  View Curriculum
                </button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-2xl opacity-20"></div>
                <div className="relative bg-gray-800 p-8 rounded-lg border border-gray-700">
                  <pre className="text-sm font-mono">
                    <code className="text-green-400"># Your first Python program</code>
                    <br />
                    <code className="text-blue-400">def</code>
                    <code className="text-white"> greet(name):</code>
                    <br />
                    <code className="text-white">    return </code>
                    <code className="text-yellow-300">f"Hello, {'{name}'}!"</code>
                    <br />
                    <br />
                    <code className="text-white">message = greet(</code>
                    <code className="text-yellow-300">"Coder"</code>
                    <code className="text-white">)</code>
                    <br />
                    <code className="text-purple-400">print</code>
                    <code className="text-white">(message)</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose CodeCraft?</h2>
            <p className="text-gray-300 text-lg">Learn Python the right way with our unique approach</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-blue-400" />,
    title: "Interactive Learning",
    description: "Learn by doing with our hands-on coding challenges and real-time feedback system."
  },
  {
    icon: <Brain className="w-6 h-6 text-blue-400" />,
    title: "Adaptive Curriculum",
    description: "Personalized learning path that adapts to your skill level and learning pace."
  },
  {
    icon: <Trophy className="w-6 h-6 text-blue-400" />,
    title: "Achievement System",
    description: "Earn badges and track your progress as you master new Python concepts."
  },
  {
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    title: "Real Projects",
    description: "Build real-world applications and add them to your portfolio."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Community Learning",
    description: "Join a community of learners and share your knowledge with others."
  }
];

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "50+", label: "Python Courses" },
  { value: "100+", label: "Practice Projects" },
  { value: "95%", label: "Success Rate" }
];

export default LandingPage;