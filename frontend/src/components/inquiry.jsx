import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./header.jsx";
import {
  FiUser,
  FiMail,
  FiHome,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import axios from "../lib/axios.jsx";

const LetterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orgName: "",
    orgType: "",
    orgAddress: "",
    orgPincode: "",
    contact: "",
  });
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(null); // Clear errors on input change
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.orgName ||
      !formData.orgType ||
      !formData.orgAddress ||
      !formData.orgPincode ||
      !formData.contact
    ) {
      return "Please fill all the details";
    }
    if (formData.orgPincode.length !== 6 || isNaN(formData.orgPincode)) {
      return "Please enter a valid 6-digit pincode";
    }
    if (formData.contact.length !== 10 || isNaN(formData.contact)) {
      return "Please enter a valid 10-digit phone number";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(null);

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setErrors({ title: "Invalid Input", message: validationError });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/inquiry", formData,{
        headers: {
          'Content-Type': 'application/json'
        }
        });
      setSuccess({
        title: "Request Submitted",
        message: response.data.message,
      });
      setFormData({
        name: "",
        email: "",
        orgName: "",
        orgType: "",
        orgAddress: "",
        orgPincode: "",
        contact: "",
      });
    } catch (error) {
      setErrors({
        title: error.response?.data?.message || "Submission Failed",
        message: error.response?.data?.error || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <Header />
  
    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 pt-20 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-2xl mx-auto">
        {/* Alerts */}
        <AnimatePresence>
          {errors && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-rose-500/20 border-l-4 border-rose-400 text-white p-4 mb-6 rounded-lg flex items-start gap-3 backdrop-blur-sm"
            >
              <FiAlertCircle className="flex-shrink-0 mt-0.5 text-rose-300" />
              <div>
                <p className="font-medium">{errors.title}</p>
                <p className="text-sm text-white/80">{errors.message}</p>
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 rounded-xl shadow-lg p-8 border border-teal-400/20 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-serif font-bold text-teal-300 mb-6 text-center">
            Organization Inquiry
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                placeholder="Organization Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-3.5 text-teal-300" />
              <select
                name="orgType"
                value={formData.orgType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-black focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 appearance-none"
              >
                <option value="" disabled>
                  Select Organization Type
                </option>
                <option value="NGO">NGO</option>
                <option value="Government">Society</option>
                <option value="Corporate">Clubs</option>
                {/* <option value="Other">Other</option> */}
              </select>
            </div>
            <div className="relative">
              <FiHome className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="text"
                name="orgAddress"
                value={formData.orgAddress}
                onChange={handleChange}
                placeholder="Organization Address"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="text"
                name="orgPincode"
                value={formData.orgPincode}
                onChange={handleChange}
                placeholder="Pincode (6 digits)"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3.5 text-teal-300" />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number (10 digits)"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-teal-400/30 text-white placeholder-white/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)",
              }}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FiCheck />
              )}
              Submit Inquiry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default LetterForm;
