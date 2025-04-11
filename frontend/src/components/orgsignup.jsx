import { useState } from "react";
import axios from "../lib/axios.jsx";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    committeeMembers: [
      {
        committeeName: "",
        committeeMail: "",
        committeePhone: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleCommitteeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.committeeMembers];
    updatedMembers[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      committeeMembers: updatedMembers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/organisation/signup", formData);
      setMessage({
        text: `Success! Check ${formData.email} for credentials`,
        type: "success",
      });
      setFormData({
        email: "",
        name: "",
        password: "",
        committeeMembers: [
          {
            committeeName: "",
            committeeMail: "",
            committeePhone: "",
          },
        ],
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Registration failed",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-6 px-8">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white">Election Portal</h2>
            </div>
            <p className="mt-2 text-center text-blue-100/90">
              Secure organization registration
            </p>
          </div>

          <div className="p-8">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-100 border border-emerald-400/20"
                    : "bg-rose-500/10 text-rose-100 border border-rose-400/20"
                }`}
              >
                <div className="flex items-center">
                  {message.type === "success" ? (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Details Section */}
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Organization Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter organization name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Contact Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500"
                        placeholder="organization@email.com"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/40">
                        @
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                     Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500"
                        placeholder="••••••••"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          className="text-white/40 hover:text-white/60"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Committee Members Section */}
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Election Committee Members
                  </h3>
                  <button
                    type="button"
                    onClick={addCommitteeMember}
                    className="flex items-center space-x-2 bg-purple-600/30 hover:bg-purple-600/40 px-4 py-2 rounded-lg transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Member</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.committeeMembers.map((member, index) => (
                    <div
                      key={index}
                      className="group relative bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-white/60">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="committeeName"
                            value={member.committeeName}
                            onChange={(e) => handleCommitteeChange(index, e)}
                            className="w-full px-3 py-2 bg-white/5 rounded-md border border-white/10 text-sm text-white"
                            placeholder="Committee member name"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-white/60">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="committeeMail"
                            value={member.committeeMail}
                            onChange={(e) => handleCommitteeChange(index, e)}
                            className="w-full px-3 py-2 bg-white/5 rounded-md border border-white/10 text-sm text-white"
                            placeholder="member@email.com"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-white/60">
                            Phone Number
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="tel"
                              name="committeePhone"
                              value={member.committeePhone}
                              onChange={(e) => handleCommitteeChange(index, e)}
                              className="w-full px-3 py-2 bg-white/5 rounded-md border border-white/10 text-sm text-white"
                              placeholder="+91 12345 67890"
                              required
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeCommitteeMember(index)}
                                className="px-2 text-red-400 hover:text-red-300 transition-colors"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all shadow-2xl hover:shadow-purple-500/30 flex items-center justify-center ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                    Creating Account...
                  </>
                ) : (
                  "Register Organization →"
                )}
              </button>
            </form>
          </div>

          <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">ASB CREATIONS LIMITED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
