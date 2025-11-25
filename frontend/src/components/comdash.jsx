import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../lib/axios';
import { FiUser, FiMail, FiPhone, FiAward, FiCheck, FiX, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

// 1. Committee Sidebar (unchanged from your original)
const CommitteeSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0, opacity: 1, width: 256 },
    closed: { x: -256, opacity: 0, width: 0 },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isSidebarOpen ? 'open' : 'closed'}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-gray-800 p-6 shadow-lg border-r border-gray-700 overflow-hidden z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-12 border-b border-gray-600 pb-6"
      >
        <h2 className="text-2xl font-bold text-white font-sans">Saarthi</h2>
        <p className="text-xs text-gray-400 mt-1 font-light">ASB Creations Limited</p>
      </motion.div>

      <nav className="space-y-2">
        {[
          { to: '/committee/nominees', label: 'View Nominees', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
          { to: '/committee/edit-nominee', label: 'Manage Nominees', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
          { to: '/committee/results', label: 'Election Results', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
          { to: '/committee/generate-link', label: 'Generate Link', icon: 'M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0-3.89-3.89-3.89-10.23 0-14.12.39-.39 1.03-.39 1.42 0 .41.39.41 1.03 0 1.42-3.1 3.1-3.1 8.14 0 11.28zM17.66 7.93c-.39-1.03-.08-2.21.68-3 .77-.78 1.97-1.07 3-.68 1.03.39 1.76 1.35 1.76 2.49 0 .29-.03.58-.1.86-.23.82-.78 1.53-1.49 1.91-.91.49-1.98.55-2.96.19l-1.72.97.97 1.71c.36.98.3 2.05-.19 2.96-.38.71-1.09 1.26-1.91 1.49-.28.07-.57.1-.86.1-1.14 0-2.1-.73-2.49-1.76-.39-1.03-.1-2.23.68-3 .77-.78 1.97-1.07 3-.68l1.62-1.62-1.62-1.63z' },
          { to: '/committee/edit-profile', label: 'Edit Profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        ].map((link, index) => (
          <motion.div key={link.to} custom={index} initial="hidden" animate="visible" variants={linkVariants}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <div className="p-1.5 rounded-md bg-blue-100">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d={link.icon} />
                </svg>
              </div>
              {link.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute bottom-6 left-6 right-6 border-t border-gray-600 pt-4"
      >
        <div className="text-center text-gray-400 text-xs">Secure Election Portal v2.0</div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-6 right-4 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </motion.button>
    </motion.div>
  );
};

// 2. Main Dashboard Layout (enhanced with your original code + new features)
const DashboardLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ pendingActions: 0, activeElections: 0, totalVoters: 0 });
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, activityRes] = await Promise.all([
        // axios.get('/api/dashboard/stats'),
        // axios.get('/api/dashboard/activity')
      ]);
      setStats(statsRes.data);
      setActivity(activityRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const startNewElection = async () => {
    try {
      await axios.post('/api/elections/start', {
        positions: ['President', 'Vice President', 'Secretary'],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
      fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start election");
    }
  };

  const sendNotifications = async () => {
    try {
      await axios.post('/api/notifications/send', {
        message: "Election updates available",
        recipients: "all"
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send notifications");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      title: 'Pending Actions', 
      value: stats.pendingActions || '0', 
      color: 'blue',
      icon: <FiAlertCircle className="text-blue-500" />
    },
    { 
      title: 'Active Elections', 
      value: stats.activeElections || '0', 
      color: 'indigo',
      icon: <FiAward className="text-indigo-500" />
    },
    { 
      title: 'Total Voters', 
      value: stats.totalVoters || '0', 
      color: 'green',
      icon: <FiUser className="text-green-500" />
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <CommitteeSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <motion.div
        className={`p-8 w-full transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {!isSidebarOpen && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(true)}
              className="fixed top-4 left-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md z-40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-lg flex items-start gap-3 shadow-sm"
          >
            <FiAlertCircle className="flex-shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
              <FiX />
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-sans">
              Welcome back, <span className="text-blue-600">Committee</span>
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Manage elections with precision and efficiency
            </p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-gray-200 hover:bg-gray-50"
          >
            <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-full bg-${stat.color}-100`}>
                      {stat.icon}
                    </div>
                    <h3 className="text-gray-600">{stat.title}</h3>
                  </div>
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                  <div className={`mt-3 h-1 bg-${stat.color}-100 rounded-full`}></div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-sans">
              Recent Activity
            </h2>
            <button 
              onClick={fetchDashboardData}
              className="text-sm bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <FiRefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse p-4 rounded-lg border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity found
            </div>
          ) : (
            <div className="space-y-4">
              {activity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, backgroundColor: '#f7fafc' }}
                  className="p-4 rounded-lg border border-gray-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full bg-blue-500`}></div>
                    <div className="text-gray-900">{item.description}</div>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-gray-900 text-lg mb-4 font-sans">Quick Actions</h3>
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewElection}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                Start New Election
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendNotifications}
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                Send Notifications
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-gray-900 text-lg mb-4 font-sans">System Status</h3>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-2 w-2 rounded-full bg-green-500"
              ></motion.div>
              <span className="text-gray-900">All systems operational</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;