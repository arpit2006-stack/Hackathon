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
    <div>
      <Header />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-serif mb-6">
              Your Voice, <span className="text-teal-600">Your Vote</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-10">
              Empowering democratic decisions through secure, transparent, and
              accessible voting technology.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <NavLink to="/inquiry">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </motion.button>
              </NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                How It Works <FiInfo className="ml-2" />
              </motion.button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md border border-teal-100 hover:border-teal-200 transition-all"
            >
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiCheckCircle className="text-teal-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Secure Voting
              </h3>
              <p className="text-slate-700">
                Blockchain-powered technology ensures tamper-proof results and
                complete transparency.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md border border-blue-100 hover:border-blue-200 transition-all"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiUsers className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Voter Verification
              </h3>
              <p className="text-slate-700">
                Advanced identity verification prevents fraud while maintaining
                voter privacy.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md border border-emerald-100 hover:border-emerald-200 transition-all"
            >
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiLock className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Real-time Results
              </h3>
              <p className="text-slate-700">
                Instant, auditable results with comprehensive analytics for
                complete oversight.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12 font-serif">
            Our Voting Process
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <motion.img
                src="/voting-illustration.svg"
                alt="Voting process"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md mx-auto"
              />
            </div>

            <div className="md:w-1/2 space-y-8">
              {[
                {
                  title: "1. Register Your Identity",
                  description:
                    "Complete our secure verification process to establish your voting eligibility.",
                  icon: <FiUser className="text-teal-500" />,
                  color: "teal",
                },
                {
                  title: "2. Access Your Ballot",
                  description:
                    "Receive your unique, encrypted ballot for each election you're eligible to vote in.",
                  icon: <FiAward className="text-blue-500" />,
                  color: "blue",
                },
                {
                  title: "3. Cast Your Vote",
                  description:
                    "Submit your choices through our intuitive, accessible voting interface.",
                  icon: <FiCheckCircle className="text-emerald-500" />,
                  color: "emerald",
                },
                {
                  title: "4. Verify & Confirm",
                  description:
                    "Review your selections and confirm your vote is counted in the final tally.",
                  icon: <FiLock className="text-indigo-500" />,
                  color: "indigo",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className={`bg-${step.color}-100 p-2 rounded-full mt-1 group-hover:bg-${step.color}-200 transition-all`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold text-slate-900 group-hover:text-${step.color}-600 transition-all`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-500 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif"
          >
            Ready to Transform Your Voting Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-teal-100 mb-8"
          >
            Join thousands of organizations using our secure voting platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button className="px-8 py-3 bg-white text-teal-700 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-slate-100 transition-all">
              Request a Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default HomePage;
