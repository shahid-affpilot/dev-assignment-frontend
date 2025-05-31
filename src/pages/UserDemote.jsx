import React, { useState } from "react";
import axios from "axios";

const UserDemote = () => {
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDemoteUser = async () => {
    if (!userId.trim() || !roleName.trim()) {
      setError("Both User ID and Role Name are required.");
      setMessage("");
      return;
    }

    const confirmDemote = window.confirm(`Demote user ID: ${userId} to role: ${roleName}?`);
    if (!confirmDemote) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/${userId}/demote`,
        { role_name: roleName },
        { withCredentials: true }
      );

      const { status, message } = response.data;
      if (status === 200) {
        setMessage(message || "User demoted successfully.");
        setError("");
      } else {
        setError(message || "Failed to demote user.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while demoting the user.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Demote User</h1>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter New Role (e.g. user)"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleDemoteUser}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Demote User
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default UserDemote;
