import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SetNewPassword = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    setToken(tokenParam || "");
  }, [location]);

  const handleReset = async () => {
    if (!password) {
        console.log('password is required')
    }

    console.log(token, password)
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/verify/password-reset?token=${token}`,
        {password},
        { withCredentials: true }
      );
      console.log(res)
      setMessage(res.data.message || "Password reset successful.");
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleReset}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Reset Password
      </button>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default SetNewPassword;
