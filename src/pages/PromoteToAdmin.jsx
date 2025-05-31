import React, { useState } from "react";
import axios from "axios";

const PromoteToAdmin = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePromoteUser = async () => {
    if (!userId.trim()) {
      setError("Please enter a user ID.");
      setMessage("");
      return;
    }

    const confirmPromote = window.confirm(`Are you sure you want to promote user ID: ${userId} to admin?`);
    if (!confirmPromote) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/${userId}/promote/admin`,
        {},
        { withCredentials: true }
      );

      const { status, message } = response.data;
      if (status === 200) {
        setMessage(message || "User promoted to admin successfully.");
        setError("");
      } else {
        setError(message || "Failed to promote user.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while promoting the user.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Promote User to Admin</h1>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handlePromoteUser}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Promote to Admin
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default PromoteToAdmin;
