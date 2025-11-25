import { useState } from "react";
import axios from "../lib/axios";
import Header from "./header";
import { motion, AnimatePresence } from "framer-motion";

const OrgSignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    committeeMembers: [
      { committeeName: "", committeeMail: "", committeePhone: "" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCommitteeChange = (index, field, value) => {
    const updated = [...formData.committeeMembers];
    updated[index][field] = value;
    setFormData({ ...formData, committeeMembers: updated });
  };

  const addCommitteeMember = () => {
    setFormData((prev) => ({
      ...prev,
      committeeMembers: [
        ...prev.committeeMembers,
        { committeeName: "", committeeMail: "", committeePhone: "" },
      ],
    }));
  };

  const removeCommitteeMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      committeeMembers: prev.committeeMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/organisation/signup", formData);
      setSuccess("Organization successfully registered!");
      setFormData({
        email: "",
        name: "",
        password: "",
        committeeMembers: [
          { committeeName: "", committeeMail: "", committeePhone: "" },
        ],
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
            Organization Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Organization Email"
                className="input"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Organization Name"
                className="input"
              />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
              className="input w-full"
            />

            <div className="space-y-4">
              <label className="text-slate-700 font-medium">Committee Members</label>

              <AnimatePresence>
                {formData.committeeMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-50 p-4 rounded-md border border-slate-200 relative"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Member Name"
                        value={member.committeeName}
                        onChange={(e) =>
                          handleCommitteeChange(index, "committeeName", e.target.value)
                        }
                        className="input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Member Email"
                        value={member.committeeMail}
                        onChange={(e) =>
                          handleCommitteeChange(index, "committeeMail", e.target.value)
                        }
                        className="input"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Member Phone No."
                        value={member.committeePhone}
                        onChange={(e) =>
                          handleCommitteeChange(index, "committeePhone", e.target.value)
                        }
                        className="input"
                        required
                      />
                    </div>
                    {formData.committeeMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCommitteeMember(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove ✕
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addCommitteeMember}
                className="text-indigo-600 hover:underline text-sm"
              >
                + Add Committee Member
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Submitting..." : "Register Organization"}
            </button>

            {error && (
              <div className="mt-4 text-center text-red-600 bg-red-50 p-2 rounded">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="mt-4 text-center text-green-600 bg-green-50 p-2 rounded">
                ✓ {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgSignupForm;
