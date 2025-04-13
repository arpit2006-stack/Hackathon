import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CommitteeSidebar = () => {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-blue-900 p-6 shadow-2xl border-r border-teal-400/20"
    >
      {/* Logo Section */}
      <div className="mb-12 border-b border-teal-400/20 pb-6">
        <h2 className="text-3xl font-bold text-teal-300 font-serif tracking-wider">
          <span className="text-white">Saarthi</span><span className="text-amber-400"></span>
        </h2>
        <p className="text-sm text-teal-200/80 mt-1 font-light">ASB CREATIONS LIMITED</p>
      </div>

      {/* Navigation Buttons */}
      <nav className="space-y-3">
        <NavLink
          to="/committee/nominees"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-teal-500/30 to-blue-500/30 text-white shadow-lg shadow-teal-500/20 border border-teal-400/30' 
              : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-teal-400 to-blue-500 group-hover:from-teal-300 group-hover:to-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          View Nominees
        </NavLink>

        <NavLink
          to="/committee/edit-nominee"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-teal-500/30 to-blue-500/30 text-white shadow-lg shadow-teal-500/20 border border-teal-400/30' 
              : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 group-hover:from-amber-300 group-hover:to-orange-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
          Manage Nominees
        </NavLink>

        <NavLink
          to="/committee/results"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-teal-500/30 to-blue-500/30 text-white shadow-lg shadow-teal-500/20 border border-teal-400/30' 
              : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 group-hover:from-emerald-300 group-hover:to-teal-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          Election Results
        </NavLink>

        {/* New Buttons */}
        <NavLink
          to="/committee/generate-link"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30' 
              : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-400 group-hover:to-indigo-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0-3.89-3.89-3.89-10.23 0-14.12.39-.39 1.03-.39 1.42 0 .41.39.41 1.03 0 1.42-3.1 3.1-3.1 8.14 0 11.28zM17.66 7.93c-.39-1.03-.08-2.21.68-3 .77-.78 1.97-1.07 3-.68 1.03.39 1.76 1.35 1.76 2.49 0 .29-.03.58-.1.86-.23.82-.78 1.53-1.49 1.91-.91.49-1.98.55-2.96.19l-1.72.97.97 1.71c.36.98.3 2.05-.19 2.96-.38.71-1.09 1.26-1.91 1.49-.28.07-.57.1-.86.1-1.14 0-2.1-.73-2.49-1.76-.39-1.03-.1-2.23.68-3 .77-.78 1.97-1.07 3-.68l1.62-1.62-1.62-1.63z"/>
            </svg>
          </div>
          Generate Link
        </NavLink>

        <NavLink
          to="/committee/edit-profile"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30' 
              : 'text-white/80 hover:bg-white/10 hover:text-white'}`
          }
        >
          <div className="p-1 rounded-md bg-gradient-to-br from-rose-500 to-pink-600 group-hover:from-rose-400 group-hover:to-pink-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          Edit Profile
        </NavLink>
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-6 left-6 right-6 border-t border-teal-400/20 pt-4">
        <div className="text-center text-teal-300/60 text-xs">
          Secure Election Portal v2.0
        </div>
      </div>
    </motion.div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <CommitteeSidebar />
      
      {/* Main Content Area */}
      <div className="ml-64 p-10 w-full">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-white mb-2 font-serif">
            Welcome back, <span className="text-teal-300">Committee</span>
          </h1>
          <p className="text-white/80 text-lg">
            Manage ongoing elections with <span className="text-amber-300">precision</span> and <span className="text-rose-300">care</span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white/5 p-6 rounded-2xl border border-teal-400/20 backdrop-blur-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
            <h3 className="text-white/80 mb-2">Pending Actions</h3>
            <p className="text-3xl font-bold text-teal-300">No Pending Approvals</p>
            <div className="mt-3 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-amber-400/20 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
            <h3 className="text-white/80 mb-2">Active Elections</h3>
            <p className="text-3xl font-bold text-amber-300">0</p>
            <div className="mt-3 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-rose-400/20 backdrop-blur-sm hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300">
            <h3 className="text-white/80 mb-2">Total Voters</h3>
            <p className="text-3xl font-bold text-rose-300">Nil</p>
            <div className="mt-3 h-1 bg-gradient-to-r from-rose-500 to-transparent rounded-full"></div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/5 p-8 rounded-2xl border border-teal-400/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white font-serif">
              Recent Activity
            </h2>
            <button className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg text-white hover:from-blue-500 hover:to-indigo-500 transition-all">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                key={item}
                className="activity-item bg-gradient-to-r from-white/5 to-white/0 p-4 rounded-lg border border-teal-400/20 hover:border-teal-400/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item === 1 ? 'bg-teal-400' : 'bg-amber-400'}`}></div>
                  <div className="text-white">New nomination received from candidate #{item}</div>
                </div>
                <div className="text-teal-200 text-sm mt-1">{item} hour{item !== 1 ? 's' : ''} ago</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-teal-900/50 to-blue-900/50 p-6 rounded-2xl border border-teal-500/20">
            <h3 className="text-white text-xl mb-4">Quick Actions</h3>
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 rounded-lg text-white hover:shadow-lg hover:shadow-teal-500/30 transition-all">
                Start New Election
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Send Notifications
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-6 rounded-2xl border border-blue-500/20">
            <h3 className="text-white text-xl mb-4">System Status</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white">All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;