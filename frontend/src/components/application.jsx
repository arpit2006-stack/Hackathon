import { useState, useRef } from "react";
import axios from "../lib/axios.jsx";
import {
  FiUpload,
  FiUser,
  FiMail,
  FiPhone,
  FiAward,
  FiFileText,
  FiKey,
} from "react-icons/fi";

const NominationForm = () => {
  const [formData, setFormData] = useState({
    registrationId: "",
    name: "",
    email: "",
    contactNo: "",
    post: "",
    agenda: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Executive Member",
  ];

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
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formPayload = new FormData();
      formPayload.append("registrationId", formData.registrationId);
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("contactNo", formData.contactNo);
      formPayload.append("post", formData.post);
      formPayload.append("agenda", formData.agenda);
      formPayload.append("ssamt", fileInputRef.current.files[0]);

      await axios.post("/api/application/apply", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        contactNo: "",
        post: "",
        agenda: "",
      });
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">
            Candidate Nomination
          </h1>
          <p className="text-lg text-gray-600">
            Submit your details to be considered for the election
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Nomination Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Your application has been received.You'll be notified via email
              about the status.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiKey className="mr-2 text-indigo-500" />
                    Registration ID
                  </label>
                  <input
                    type="text"
                    value={formData.registrationId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="Enter your candidate registration ID"
                    required
                  />
                </div>
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiUser className="mr-2 text-indigo-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiMail className="mr-2 text-indigo-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Contact Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiPhone className="mr-2 text-indigo-500" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) =>
                      setFormData({ ...formData, contactNo: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="9876543210"
                    required
                  />
                </div>

                {/* Position Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiAward className="mr-2 text-indigo-500" />
                    Position
                  </label>
                  <select
                    value={formData.post}
                    onChange={(e) =>
                      setFormData({ ...formData, post: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none"
                    required
                  >
                    <option value="">Select Position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Agenda Field */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiFileText className="mr-2 text-indigo-500" />
                    Your Agenda
                  </label>
                  <textarea
                    value={formData.agenda}
                    onChange={(e) =>
                      setFormData({ ...formData, agenda: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all min-h-[120px]"
                    placeholder="Explain your vision and agenda..."
                    required
                  />
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Payment Proof (SS of Amount)
                  </label>
                  <div
                    className={`border-2 border-dashed ${
                      preview
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-300"
                    } rounded-lg transition-all cursor-pointer`}
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
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-red-400"
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
                        <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                          <FiUpload className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-sm text-gray-600">
                          Drag & drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
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

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-center">
                  ⚠️ {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-lg text-white font-bold transition-all ${
                    loading
                      ? "bg-indigo-400"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Processing...
                    </span>
                  ) : (
                    "Submit Nomination"
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-xs text-gray-500">
                By submitting this form, you agree to our terms and conditions.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NominationForm;
