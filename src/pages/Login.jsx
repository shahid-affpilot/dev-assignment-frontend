import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const res = await axios.post(
                'http://localhost:8080/api/v1/auth/login',
                formData,
                {
                    withCredentials: true // To accept HTTP-only JWT from server
                }
            );

            // Store user_type and user_id in localStorage
            localStorage.setItem('user_type', res.data.user_type);
            localStorage.setItem('user_id', res.data.data.user_id);
            localStorage.setItem('email', formData.email);

            setSuccessMsg('Login Successful!');
            navigate('/dashboard');
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full flex gap-8">
                {/* Left Info Section */}
                <div className="flex-1 bg-blue-600 text-white rounded-lg p-8 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-6">Affpilot AI</h1>
                    <p className="text-lg text-blue-100">
                        Your personalized login portal to AI-powered tools and insights.
                    </p>
                </div>

                {/* Right Login Form */}
                <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Log In</h2>

                    {successMsg && (
                        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                        <div className="text-center">
                            <a
                                href="/profile/reset-password"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
