import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 bg-slate-900 shadow-md z-50 border-b border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo/Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-baseline group"
          >
            <h1 className="text-2xl font-bold text-white tracking-tight font-serif">
              Saarthi
            </h1>
            <span className="ml-2 text-sm font-light text-slate-400 group-hover:text-amber-400 transition-colors">
              by ASB CREATIONS
            </span>
          </motion.div>

          {/* Right: Navigation */}
          <div className="flex items-center space-x-8">
            <motion.a
              href="#how-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                y: -2,
                color: "#f59e0b" // amber-500
              }}
              className="text-slate-300 hover:text-white font-medium text-base transition-colors relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
            
            <NavLink to="/login">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(245, 158, 11, 0.1)" // amber-500/10
                }}
                className="text-amber-400 font-medium text-base py-2 px-5 rounded-md transition-all border border-amber-400/30 hover:border-amber-400/50 relative overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-amber-400/10 opacity-0 hover:opacity-100 transition-opacity"></span>
              </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;