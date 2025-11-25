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
      const response = await axios.post("/api/inquiry", formData, {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const iconVariants = {
    rest: { scale: 1 },
    focus: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Alerts */}
          <AnimatePresence>
            {errors && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-lg flex items-start gap-3 shadow-sm"
              >
                <FiAlertCircle className="flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-medium">{errors.title}</p>
                  <p className="text-sm text-red-600">{errors.message}</p>
                </div>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 mb-6 rounded-lg flex items-start gap-3 shadow-sm"
              >
                <FiCheck className="flex-shrink-0 mt-0.5 text-green-500" />
                <div>
                  <p className="font-medium">{success.title}</p>
                  <p className="text-sm text-green-600">{success.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-8 border border-gray-200"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-sans font-bold text-gray-900 mb-6 text-center"
            >
              Organization Inquiry
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name", placeholder: "Full Name", icon: FiUser },
                { name: "email", type: "email", placeholder: "Email Address", icon: FiMail },
                { name: "orgName", placeholder: "Organization Name", icon: FiBriefcase },
                {
                  name: "orgType",
                  type: "select",
                  placeholder: "Select Organization Type",
                  icon: FiBriefcase,
                  options: ["", "NGO", "Government", "Corporate"],
                },
                { name: "orgAddress", placeholder: "Organization Address", icon: FiHome },
                { name: "orgPincode", placeholder: "Pincode (6 digits)", icon: FiMapPin },
                { name: "contact", placeholder: "Contact Number (10 digits)", icon: FiPhone },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  variants={itemVariants}
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                >
                  {field.type === "select" ? (
                    <>
                      <motion.div
                        variants={iconVariants}
                        className="absolute left-3 top-3.5 text-gray-500"
                      >
                        <field.icon />
                      </motion.div>
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none font-medium ${
                          loading ? "animate-pulse opacity-50" : ""
                        }`}
                        disabled={loading}
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option} disabled={option === ""}>
                            {option || field.placeholder}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <motion.div
                        variants={iconVariants}
                        className="absolute left-3 top-3.5 text-gray-500"
                      >
                        <field.icon />
                      </motion.div>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium ${
                          loading ? "animate-pulse opacity-50" : ""
                        }`}
                        disabled={loading}
                      />
                    </>
                  )}
                </motion.div>
              ))}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                animate={success ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } } : {}}
                className={`w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 ${
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