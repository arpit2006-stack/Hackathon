import { useState, useEffect } from 'react';
import axios from '../lib/axios.jsx';
import { FiUser, FiMail, FiPhone, FiAward, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ApprovalDashboard = () => {
  const [post, setPost] = useState('President');
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-rose-500/20 border-l-4 border-rose-400 text-white p-4 mb-6 rounded-lg flex items-start gap-3 backdrop-blur-sm"
            >
              <FiAlertCircle className="flex-shrink-0 mt-0.5 text-rose-300" />
              <div>
                <p className="font-medium">{error.title}</p>
                <p className="text-sm text-white/80">{error.message}</p>
              </div>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-500/20 border-l-4 border-emerald-400 text-white p-4 mb-6 rounded-lg flex items-start gap-3 backdrop-blur-sm"
            >
              <FiCheck className="flex-shrink-0 mt-0.5 text-emerald-300" />
              <div>
                <p className="font-medium">{success.title}</p>
                <p className="text-sm text-white/80">{success.message}</p>
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
          <h1 className="text-4xl font-bold text-teal-300 mb-2 font-serif">
            Candidate Approval
          </h1>
          <p className="text-white/80 text-lg">
            Review and approve candidate applications
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 rounded-xl shadow-lg p-6 mb-8 border border-teal-400/20 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <select
                value={post}
                onChange={(e) => setPost(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border border-teal-400/30 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 appearance-none bg-slate-800 text-white font-medium"
              >
                {['President', 'Vice President', 'Secretary', 'Treasurer'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <FiAward className="absolute right-3 top-3.5 text-teal-300" />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"
            />
          </div>
        ) : candidates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/5 rounded-xl shadow-lg border border-teal-400/20 backdrop-blur-sm"
          >
            <p className="text-teal-300 text-xl font-medium">
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
                  className="bg-white/5 rounded-xl shadow-lg overflow-hidden border border-teal-400/20 hover:shadow-xl transition-all backdrop-blur-sm"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        whileHover={{ rotate: 10 }}
                        className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 p-3 rounded-full"
                      >
                        <FiUser className="text-teal-300 text-xl" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{c.name}</h3>
                        <p className="text-teal-300 text-sm font-medium">{c.post}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center text-white/90">
                        <FiMail className="mr-2 text-teal-300" />
                        <span className="truncate">{c.email}</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <FiPhone className="mr-2 text-teal-300" />
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
                            className={`px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center gap-2 shadow-md hover:shadow-lg ${
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
                            className={`px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:from-rose-400 hover:to-pink-500 transition-all flex items-center gap-2 shadow-md hover:shadow-lg ${
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
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                              : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
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
    </div>
  );
};

export default ApprovalDashboard;