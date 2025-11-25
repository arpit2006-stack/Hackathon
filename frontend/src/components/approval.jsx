import { useState, useEffect } from 'react';
import axios from '../lib/axios.jsx';
import { FiUser, FiMail, FiPhone, FiAward, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
      initial="open"
      animate={isSidebarOpen ? 'open' : 'closed'}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-gray-800 p-6 shadow-lg border-r border-gray-700 overflow-hidden"
    >
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-12 border-b border-gray-600 pb-6"
      >
        <h2 className="text-2xl font-bold text-white font-sans">
          Saarthi
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-light">ASB Creations Limited</p>
      </motion.div>

      {/* Navigation Buttons */}
      <nav className="space-y-2">
        {[
          { to: '/committee/nominees', label: 'View Nominees', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
          { to: '/committee/edit-nominee', label: 'Manage Nominees', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
          { to: '/committee/results', label: 'Election Results', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
          { to: '/committee/generate-link', label: 'Generate Link', icon: 'M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0-3.89-3.89-3.89-10.23 0-14.12.39-.39 1.03-.39 1.42 0 .41.39.41 1.03 0 1.42-3.1 3.1-3.1 8.14 0 11.28zM17.66 7.93c-.39-1.03-.08-2.21.68-3 .77-.78 1.97-1.07 3-.68 1.03.39 1.76 1.35 1.76 2.49 0 .29-.03.58-.1.86-.23.82-.78 1.53-1.49 1.91-.91.49-1.98.55-2.96.19l-1.72.97.97 1.71c.36.98.3 2.05-.19 2.96-.38.71-1.09 1.26-1.91 1.49-.28.07-.57.1-.86.1-1.14 0-2.1-.73-2.49-1.76-.39-1.03-.1-2.23.68-3 .77-.78 1.97-1.07 3-.68l1.62-1.62-1.62-1.63z' },
          { to: '/committee/edit-profile', label: 'Edit Profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        ].map((link, index) => (
          <motion.div
            key={link.to}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
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

      {/* Sidebar Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="absolute bottom-6 left-6 right-6 border-t border-gray-600 pt-4"
      >
        <div className="text-center text-gray-400 text-xs">
          Secure Election Portal v2.0
        </div>
      </motion.div>

      {/* Sidebar Toggle Button */}
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

const ApprovalDashboard = () => {
  const [post, setPost] = useState('President');
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/candidates/approval/${post}`);
      setCandidates(data.candidates || []);
    } catch (err) {
      setError({
        title: 'Failed to fetch candidates',
        message: err.response?.data?.message || 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    setUpdatingId(id);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await axios.patch(`/api/candidates/approval/${id}`, { status });
      
      setSuccess({
        title: `Status updated to ${status}`,
        message: `Email notification sent to candidate`
      });
      
      fetchCandidates();
    } catch (err) {
      setError({
        title: 'Update failed',
        message: err.response?.data?.error || 'Failed to update status'
      });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => { 
    fetchCandidates(); 
  }, [post]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <CommitteeSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <motion.div
        className={`p-6 w-full transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar Toggle Button (Visible when sidebar is closed) */}
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
              className="fixed top-4 left-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-lg flex items-start gap-3 shadow-sm"
              >
                <FiAlertCircle className="flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-medium">{error.title}</p>
                  <p className="text-sm text-red-600">{error.message}</p>
                </div>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border-l-4 border-emerald-400 text-emerald-700 p-4 mb-6 rounded-lg flex items-start gap-3 shadow-sm"
              >
                <FiCheck className="flex-shrink-0 mt-0.5 text-emerald-500" />
                <div>
                  <p className="font-medium">{success.title}</p>
                  <p className="text-sm text-emerald-600">{success.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-slate-800 mb-2 font-sans tracking-tight">
              Candidate Approval Dashboard
            </h1>
            <p className="text-slate-600">
              Review and approve candidate applications
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-slate-200"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Position
                </label>
                <select
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 appearance-none bg-white text-slate-800 font-medium"
                >
                  {['President', 'Vice President', 'Secretary', 'Treasurer'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <FiAward className="absolute right-3 top-10 text-slate-500" />
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-400"
              />
            </div>
          ) : candidates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <p className="text-slate-700 text-lg font-medium">
                No candidates found for {post}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {candidates.map((c) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-slate-100 p-3 rounded-full">
                          <FiUser className="text-slate-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">{c.name}</h3>
                          <p className="text-slate-500 text-sm font-medium">{c.post}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-slate-700">
                          <FiMail className="mr-2 text-slate-500" />
                          <span className="truncate">{c.email}</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                          <FiPhone className="mr-2 text-slate-500" />
                          {c.contactNo}
                        </div>
                      </div>

                      <div className="mt-6">
                        {c.status === 'Pending' ? (
                          <motion.div 
                            className="flex space-x-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <button
                              onClick={() => handleStatus(c._id, 'Approved')}
                              disabled={updatingId === c._id}
                              className={`px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm hover:shadow-md ${
                                updatingId === c._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {updatingId === c._id ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <FiCheck />
                              )}
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatus(c._id, 'Rejected')}
                              disabled={updatingId === c._id}
                              className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 shadow-sm hover:shadow-md ${
                                updatingId === c._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {updatingId === c._id ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <FiX />
                              )}
                              Reject
                            </button>
                          </motion.div>
                        ) : (
                          <motion.span 
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              c.status === 'Approved' 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                          >
                            {c.status}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApprovalDashboard;