import { NavLink } from 'react-router-dom';

const CommitteeSidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-purple-800/90 backdrop-blur-lg border-r border-emerald-400/20 p-6 shadow-xl">
      {/* Logo Section */}
      <div className="mb-12 border-b border-emerald-400/20 pb-6">
        <h2 className="text-2xl font-bold text-emerald-300 font-sans">
          <span className="text-purple-200">E</span>Vote
        </h2>
        <p className="text-sm text-emerald-300/80 mt-1">ASB CREATIONS LIMITED</p>
      </div>

      {/* Navigation Buttons */}
      <nav className="space-y-2">
        <NavLink
          to="/committee/nominees"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300
            ${isActive 
              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 shadow-md' 
              : 'text-purple-100 hover:bg-emerald-400/10 hover:text-emerald-200'}`
          }
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          View Nominees
        </NavLink>

        <NavLink
          to="/committee/edit-nominee"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300
            ${isActive 
              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 shadow-md' 
              : 'text-purple-100 hover:bg-emerald-400/10 hover:text-emerald-200'}`
          }
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Manage Nominees
        </NavLink>

        <NavLink
          to="/committee/results"
          className={({ isActive }) => 
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300
            ${isActive 
              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 shadow-md' 
              : 'text-purple-100 hover:bg-emerald-400/10 hover:text-emerald-200'}`
          }
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
          Election Results
        </NavLink>
      </nav>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
      <CommitteeSidebar />
      
      {/* Main Content Area */}
      <div className="ml-64 p-10 w-full">
        {/* Welcome Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-emerald-300 mb-2">
            Welcome back, <span className="text-purple-200">Committee</span>
          </h1>
          <p className="text-purple-200/80 text-lg">
            Manage ongoing elections with precision and care
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-emerald-400/10 p-6 rounded-2xl border border-emerald-400/20 backdrop-blur-sm">
            <h3 className="text-purple-200 mb-2">Pending Actions</h3>
            <p className="text-3xl font-bold text-emerald-300">No Pending Approvals</p>
          </div>
          <div className="bg-emerald-400/10 p-6 rounded-2xl border border-emerald-400/20 backdrop-blur-sm">
            <h3 className="text-purple-200 mb-2">Active Elections</h3>
            <p className="text-3xl font-bold text-emerald-300">0</p>
          </div>
          <div className="bg-emerald-400/10 p-6 rounded-2xl border border-emerald-400/20 backdrop-blur-sm">
            <h3 className="text-purple-200 mb-2">Total Voters</h3>
            <p className="text-3xl font-bold text-emerald-300">Nil</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-purple-800/40 p-8 rounded-2xl border border-purple-700/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="activity-item">
              <div className="text-purple-200">New nomination received</div>
              <div className="text-emerald-300 text-sm">2 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout