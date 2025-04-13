import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 bg-gradient-to-r from-cyan-600 via-coral-300 to-pink-300 shadow-lg z-5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Website Name */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-baseline"
            >
              <h1 className="text-2xl font-bold text-white tracking-tight">
              Saarthi
              </h1>
              <span
                className="ml-2 text-sm font-normal text-white/80 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                by ASB CREATIONS
              </span>
            </motion.div>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-6">
            <motion.a
              href="#how-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.1, color: "#2DD4BF" }}
              className="text-white font-semibold text-base hover:text-orange-400 transition-colors"
            >
              How It Works
            </motion.a>
            <NavLink to="/login">
            <motion
              // href="#login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)",
              }}
              className="bg-grey/10 text-white font-semibold text-base py-1.5 px-4 rounded-lg shadow-md hover:bg-white/20 transition-all border border-teal-400/30 backdrop-blur-sm"
            >
              Login
            </motion>
            </NavLink>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;