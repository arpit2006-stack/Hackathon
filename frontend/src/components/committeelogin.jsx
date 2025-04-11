import { useState } from "react";
import axios from "../lib/axios.jsx";
import { useNavigate } from "react-router-dom";

const CommitteeLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/committee/login", formData);
      localStorage.setItem("committeeToken", res.data.token);
      navigate("/committee/dashboard");
    } catch (err) {
      setError(err.res?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-pink-400/20 relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ec489980_0%,transparent_70%)] animate-pulse-slow" />

          {/* Header Section */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 px-8 pt-10 pb-12 relative">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-pink-300/20">
                <svg
                  className="w-8 h-8 text-orange-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-300">
                Committe Login
              </h1>
              <p className="text-pink-200/90 text-center text-sm">
                Committee Member Gateway
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-10 relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/20 text-red-200 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-100/90">
                  Organisation Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-pink-300/20 text-purple-50 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all"
                    placeholder="Your Organisation"
                    required
                  />
                  <div className="absolute right-3 top-3 text-pink-300/50">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-100/90">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-pink-300/20 text-purple-50 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute right-3 top-3 text-pink-300/50">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-purple-50 font-semibold tracking-wide transition-all shadow-lg hover:shadow-fuchsia-500/20 relative overflow-hidden ${
                  isLoading ? "opacity-90 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center">
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
                    </span>
                    <span className="invisible">Authenticating</span>
                  </>
                ) : (
                  "Unlock Portal"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-purple-900/30 border-t border-pink-400/20 text-center">
            <p className="text-xs text-pink-200/60">
              Created by ASB CREATIONS LIMITED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeLogin;
