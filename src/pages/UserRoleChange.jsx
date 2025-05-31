import React, { useState } from "react";
import axios from "axios";

const ChangeUserRole = () => {
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangeRole = async () => {
    if (!userId.trim() || !roleName.trim()) {
      setError("User ID and new role name are required.");
      setMessage("");
      return;
    }

    const confirmChange = window.confirm(`Change role of user ID: ${userId} to "${roleName}"?`);
    if (!confirmChange) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/${userId}/role`,
        { role_name: roleName },
        { withCredentials: true }
      );

      const { status, message } = response.data;
      if (status === 200) {
        setMessage(message || "User role updated successfully.");
        setError("");
      } else {
        setError(message || "Failed to update user role.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while changing the user's role.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Change User Role</h1>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter New Role (e.g. admin, moderator)"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleChangeRole}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Change Role
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default ChangeUserRole;
