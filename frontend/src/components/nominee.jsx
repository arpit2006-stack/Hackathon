import { useState } from 'react';
import axios from '../lib/axios.jsx';

const NomineeForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    post: '',
    houseNo: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Color Palette
  const primaryColor = '#00e0ff';   // Bright Cyan
  const secondaryColor = '#ff7f50'; // Coral
  const accentColor = '#ff6b6b';    // Soft Pink

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/candidate/nominate/start', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#00e0ff] to-[#ff7f50] bg-clip-text text-transparent">
            Candidate Nomination
          </h1>
          <p className="text-gray-600">Enter your details to join the election</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="candidate@example.com"
                required
              />
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="35"
                min="25"
                required
              />
            </div>

            {/* Post Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Position</label>
              <select
                name="post"
                value={formData.post}
                onChange={(e) => setFormData({...formData, post: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 bg-white appearance-none"
                required
              >
                <option value="">Select Position</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
              </select>
            </div>

            {/* House Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">House Number</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={(e) => setFormData({...formData, houseNo: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="B-42"
                required
              />
            </div>

            {/* OTP Field (Disabled until email verification) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">OTP</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 bg-gray-50 cursor-not-allowed"
                placeholder="Will be sent to your email"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold transition-all ${
              loading ? 'bg-gray-400' : 'bg-[#ff7f50] hover:bg-[#ff6b6b] hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Nomination'}
          </button>

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-200 text-green-600 text-center">
              ✓ Nomination submitted successfully! Check your email for OTP
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NomineeForm;