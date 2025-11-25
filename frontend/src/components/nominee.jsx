import { useState, useRef } from "react";
import axios from "../lib/axios.jsx";
import Header from "./header.jsx";

const NomineeForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    role: "", // Added role field
    positionImage: null,
  });
  const [otp, setOtp] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState({ type: "", message: "" });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Image Upload Handlers
  const handleImageUpload = (file) => {
    if (!file) return;

    if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
      setError("Only PNG/JPEG images allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((prev) => ({ ...prev, positionImage: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-slate-400", "bg-slate-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-slate-400", "bg-slate-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-slate-400", "bg-slate-50");
    handleImageUpload(e.dataTransfer.files[0]);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess({ type: "", message: "" });

    try {
      const formPayload = new FormData();
      formPayload.append("email", formData.email);
      formPayload.append("name", formData.name);
      formPayload.append("age", formData.age);
      formPayload.append("role", formData.role); // Added role to form data
      formPayload.append("positionImage", formData.positionImage);

      await axios.post("/api/candidate/nominate/start", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowOtpModal(true);
      setSuccess({ type: "otp", message: "OTP sent to your email" });
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification
  const verifyOtp = async () => {
    setVerifying(true);
    setError("");
    try {
      await axios.post("/api/candidate/nominate/create", {
        email: formData.email,
        otp,
      });

      setSuccess({
        type: "nomination",
        message: `Registration ID sent to ${formData.email}`,
      });

      setTimeout(() => {
        setShowOtpModal(false);
        setFormData({
          email: "",
          name: "",
          age: "",
          role: "",
          positionImage: null,
        });
        setPreview("");
        setOtp("");
        setSuccess({ type: "", message: "" });
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 font-serif tracking-tight">
              Registration Portal
            </h1>
            <p className="text-slate-600">
              Complete your nomination application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 transition-all"
                  placeholder="candidate@example.com"
                  required
                />
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 transition-all"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 transition-all"
                  placeholder="35"
                  min="21"
                  max="100"
                  required
                />
              </div>

              {/* Role Field - New Select Box */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="candidate">Candidate</option>
                  <option value="voter">Voter</option>
                </select>
              </div>

              {/* ID Proof Upload */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Upload ID Proof
                </label>
                <div
                  className={`border-2 border-dashed ${
                    preview
                      ? "border-slate-300 bg-slate-50"
                      : "border-slate-300 hover:border-slate-400"
                  } rounded-lg transition-all cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  {preview ? (
                    <div className="relative p-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-md object-contain"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview("");
                          setFormData((prev) => ({
                            ...prev,
                            positionImage: null,
                          }));
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
                      >
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <svg
                          className="w-5 h-5 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-600">
                        Drag & drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Supported formats: JPG, PNG (Max 2MB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.positionImage || !formData.role}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
                loading || !formData.positionImage || !formData.role
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? "Sending OTP..." : "Submit Nomination"}
            </button>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            {success.type === "otp" && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Check your email for verification code
              </div>
            )}
          </form>

          {showOtpModal && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  Verify OTP
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 transition-all"
                    maxLength="6"
                    inputMode="numeric"
                    pattern="\d{6}"
                  />
                  <p className="text-sm text-slate-500 text-center">
                    Sent to: {formData.email}
                  </p>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyOtp}
                    disabled={verifying}
                    className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${
                      verifying
                        ? "bg-slate-400"
                        : "bg-slate-900 hover:bg-slate-800"
                    } transition-colors`}
                  >
                    {verifying ? "Verifying..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {success.type === "nomination" && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Nomination Successful!
                </h3>
                <div className="mt-2 text-slate-600">
                  <p>Your registration ID has been sent to:</p>
                  <p className="font-medium text-slate-900">{formData.email}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setSuccess({ type: "", message: "" })}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomineeForm;
