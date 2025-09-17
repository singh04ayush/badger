import React, { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { FiUser, FiTrendingUp, FiAward, FiTarget, FiPlus, FiExternalLink, FiStar, FiCalendar } from 'react-icons/fi'

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Dashboard = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [user] = useState({ name: "John Doe", totalBadges: 24, platformsConnected: 5, recentAchievements: 3 });

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;

  return (
    <motion.div
      style={{ backgroundImage }}
      className="min-h-screen bg-gray-950 text-gray-200 pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <DashboardHeader user={user} border={border} />
        
        {/* Stats Cards */}
        <StatsSection user={user} border={border} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Achievements */}
          <RecentAchievements border={border} />
          
          {/* Quick Actions */}
          <QuickActions border={border} />
          
          {/* Progress Overview */}
          <ProgressOverview border={border} />
        </div>
        
        {/* Recent Activity */}
        <RecentActivity border={border} />
      </div>
    </motion.div>
  )
}

const DashboardHeader = ({ user, border }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="mt-2 text-gray-400">
            Track your achievements and showcase your skills
          </p>
        </div>
        <motion.button
          style={{ border }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Connect Platform
        </motion.button>
      </div>
    </motion.div>
  )
}

const StatsSection = ({ user, border }) => {
  const stats = [
    { label: "Total Badges", value: user.totalBadges, icon: FiAward, color: "from-blue-400 to-purple-500" },
    { label: "Platforms Connected", value: user.platformsConnected, icon: FiTarget, color: "from-green-400 to-teal-500" },
    { label: "Recent Achievements", value: user.recentAchievements, icon: FiTrendingUp, color: "from-orange-400 to-red-500" },
    { label: "Profile Views", value: "1.2k", icon: FiUser, color: "from-pink-400 to-purple-500" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          style={{ border }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const RecentAchievements = ({ border }) => {
  const achievements = [
    { title: "JavaScript Expert", platform: "HackerRank", date: "2 days ago", icon: "🏆" },
    { title: "React Specialist", platform: "Codecademy", date: "1 week ago", icon: "⚛️" },
    { title: "Algorithm Master", platform: "LeetCode", date: "2 weeks ago", icon: "🧠" },
    { title: "CSS Wizard", platform: "FreeCodeCamp", date: "3 weeks ago", icon: "🎨" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ border }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiAward className="w-5 h-5" />
        Recent Achievements
      </h3>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <span className="text-2xl">{achievement.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-white">{achievement.title}</p>
              <p className="text-sm text-gray-400">{achievement.platform} • {achievement.date}</p>
            </div>
            <FiExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const QuickActions = ({ border }) => {
  const actions = [
    { title: "Add New Badge", description: "Upload or connect a new achievement", icon: FiPlus, color: "from-blue-500 to-purple-600" },
    { title: "Share Profile", description: "Share your badge collection", icon: FiExternalLink, color: "from-green-500 to-teal-600" },
    { title: "View Analytics", description: "See your progress insights", icon: FiTrendingUp, color: "from-orange-500 to-red-600" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ border }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">{action.title}</p>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

const ProgressOverview = ({ border }) => {
  const platforms = [
    { name: "GitHub", progress: 85, badges: 12 },
    { name: "LeetCode", progress: 70, badges: 8 },
    { name: "HackerRank", progress: 60, badges: 4 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      style={{ border }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiTarget className="w-5 h-5" />
        Platform Progress
      </h3>
      <div className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">{platform.name}</span>
              <span className="text-sm text-gray-400">{platform.badges} badges</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${platform.progress}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-400">{platform.progress}% complete</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const RecentActivity = ({ border }) => {
  const activities = [
    { action: "Earned JavaScript Expert badge", platform: "HackerRank", time: "2 hours ago", type: "achievement" },
    { action: "Connected GitHub account", platform: "GitHub", time: "1 day ago", type: "connection" },
    { action: "Shared profile on LinkedIn", platform: "LinkedIn", time: "3 days ago", type: "share" },
    { action: "Completed React course", platform: "Codecademy", time: "1 week ago", type: "course" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{ border }}
      className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiCalendar className="w-5 h-5" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            <div className="flex-1">
              <p className="text-white">{activity.action}</p>
              <p className="text-sm text-gray-400">{activity.platform} • {activity.time}</p>
            </div>
            <FiStar className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Dashboard