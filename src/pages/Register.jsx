import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      setSuccessMsg('Registration Successful! Check your mail to verify.');
      setFormData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false)
    }
  };

  // Auto-hide success message
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Auto-hide error message
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        
        {/* Left - Info Section */}
        <div className="lg:w-1/2 bg-blue-600 text-white rounded-lg p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Affpilot AI</h1>
          <p className="text-base md:text-lg text-blue-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet temporibus rerum dolorem officia dolore culpa ex natus nobis tempore vel?
          </p>
        </div>

        {/* Right - Form Section */}
        <div className="lg:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Create Account</h2>

          {/* Tailwind Popup Messages */}
          {successMsg && (
            <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-300 rounded">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 p-4 text-red-800 bg-red-100 border border-red-300 rounded">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Registering" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
