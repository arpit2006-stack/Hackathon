import { useState, useRef } from 'react';
import axios from '../lib/axios.jsx';
import Header from './header.jsx';

const NomineeForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    positionImage: null
  });
  const [otp, setOtp] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    if (!file) return;
    
    if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
      setError('Only PNG/JPEG images allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData(prev => ({ ...prev, positionImage: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-cyan-400', 'bg-cyan-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-cyan-400', 'bg-cyan-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-cyan-400', 'bg-cyan-50');
    handleImageUpload(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formPayload = new FormData();
      formPayload.append('email', formData.email);
      formPayload.append('name', formData.name);
      formPayload.append('age', formData.age);
      formPayload.append('positionImage', formData.positionImage);

      await axios.post('/api/candidate/nominate/start', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setShowOtpModal(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      await axios.post('/api/candidate/nominate/create', {
        email: formData.email,
        otp
      });

      setSuccess(true);
      setTimeout(() => {
        setShowOtpModal(false);
        setFormData({ email: '', name: '', age: '', positionImage: null });
        setPreview('');
        setOtp('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      setTimeout(() => setError(''), 5000);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#00e0ff] to-[#ff7f50] bg-clip-text text-transparent">
            Candidate Nomination
          </h1>
          <p className="text-gray-600">Enter your details to join the election</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="candidate@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-600">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                placeholder="35"
                min="21"
                max="100"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-cyan-600">
                Position/Post Image
              </label>
              <div 
                className={`border-2 border-dashed border-cyan-100 rounded-xl p-6 text-center cursor-pointer ${
                  preview ? 'border-solid' : 'hover:border-cyan-200'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {preview ? (
                  <div className="relative group">
                    <img 
                      src={preview} 
                      alt="Position preview" 
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview('');
                        setFormData(prev => ({...prev, positionImage: null}));
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-cyan-600 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-cyan-600">
                      Drag & drop image here<br />
                      or click to upload
                    </p>
                    <p className="text-xs text-cyan-400 mt-2">
                      Recommended: Square aspect ratio (Max 2MB)
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.positionImage}
            className={`w-full py-4 rounded-xl text-white font-bold transition-all ${
              loading || !formData.positionImage ? 'bg-gray-400' : 'bg-[#ff7f50] hover:bg-[#ff6b6b] hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Sending OTP...' : 'Submit Nomination'}
          </button>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-600 text-center">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-200 text-green-600 text-center">
              ✓ OTP sent to your email!
            </div>
          )}
        </form>

        {showOtpModal && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 animate-scale-in">
              <h2 className="text-2xl font-bold text-cyan-600 mb-4">Verify OTP</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 rounded-xl border-2 border-cyan-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 transition-all"
                />
                {error && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-200 text-red-600">
                    ⚠️ {error}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={verifying}
                  className={`flex-1 px-4 py-2 rounded-xl text-white font-bold ${
                    verifying ? 'bg-gray-400' : 'bg-cyan-500 hover:bg-cyan-600'
                  } transition-colors`}
                >
                  {verifying ? 'Verifying...' : 'Confirm'}
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