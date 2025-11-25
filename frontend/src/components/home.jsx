import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiInfo,
  FiCheckCircle,
  FiUsers,
  FiLock,
  FiAward,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Header from "./header";

const HomePage = () => {
  return (
    <div className="bg-slate-50">
      <Header />
      <div className="min-h-screen">
        {/* Hero Section - Now more refined */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-tight">
                Your Voice, <span className="text-amber-400">Your Vote</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                Empowering democratic decisions through secure, transparent, and
                accessible voting technology.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <NavLink to="/inquiry">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  >
                    Get Started <FiArrowRight className="ml-2" />
                  </motion.button>
                </NavLink>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-transparent text-white border-2 border-slate-400 hover:border-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  How It Works <FiInfo className="ml-2" />
                </motion.button>
              </div>
            </motion.div>

            {/* Features Grid - More sophisticated */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: <FiCheckCircle className="text-amber-500 text-xl" />,
                  title: "Secure Voting",
                  description: "Complete anonymous voting so you can use your democratic power in a democratic nation",
                  borderColor: "border-amber-400/20"
                },
                {
                  icon: <FiUsers className="text-blue-400 text-xl" />,
                  title: "Voter Verification",
                  description: "Advanced identity verification prevents fraud while maintaining voter privacy.",
                  borderColor: "border-blue-400/20"
                },
                {
                  icon: <FiLock className="text-emerald-400 text-xl" />,
                  title: "Real-time Results",
                  description: "Clear results with transparency",
                  borderColor: "border-emerald-400/20"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`bg-slate-800/50 p-8 rounded-xl shadow-lg border ${feature.borderColor} hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="bg-slate-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Elegant stepped process */}
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 font-serif tracking-tight">
              Our Voting Process
            </h2>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <motion.img
                  src="https://img.freepik.com/free-vector/elections-concept-illustration_114360-19717.jpg"
                  alt="Voting process"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                />
              </div>

              <div className="md:w-1/2 space-y-8">
                {[
                  {
                    title: "1. Register Your Identity",
                    description: "Complete our secure verification process to establish your voting eligibility.",
                    icon: <FiUser className="text-amber-500" />,
                    color: "amber"
                  },
                  {
                    title: "2. Access Your ID",
                    description: "After registration you will get an id via email keep it securely as it is necessary ahead",
                    icon: <FiAward className="text-blue-400" />,
                    color: "blue"
                  },
                  {
                    title: "3. Cast Your Vote",
                    description: "Submit your choices on the day of elections seamlessly",
                    icon: <FiCheckCircle className="text-emerald-400" />,
                    color: "emerald"
                  },
                  {
                    title: "4. Verify & Confirm",
                    description: "Confirm your vote so that you choose the right candidate of your choice",
                    icon: <FiLock className="text-indigo-400" />,
                    color: "indigo"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className={`bg-${step.color}-100/30 p-3 rounded-lg mt-0.5 group-hover:bg-${step.color}-100/50 transition-all`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold text-slate-900 mb-1.5 group-hover:text-${step.color}-600 transition-all`}>
                        {step.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - More premium */}
        <section className="py-24 bg-slate-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif tracking-tight"
            >
              Ready to Transform Your Voting Experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of organizations using our secure voting platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <NavLink to="/inquiry">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Begin Secure Voting
                </motion.button>
              </NavLink>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;