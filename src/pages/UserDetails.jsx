import React, { useState } from "react";
import axios from "axios";

const UserDetails = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFetchUser = async () => {
    if (!userId.trim()) {
      setError("Please enter a user ID.");
      setMessage("");
      setUserData(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
        withCredentials: true,
      });

      const { status, message, data } = response.data;

      if (status === 200) {
        setUserData(data);
        setMessage(message || "User found.");
        setError("");
      } else {
        setError(message || "Failed to fetch user.");
        setUserData(null);
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while fetching the user.");
      setUserData(null);
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Get User by ID</h1>

        <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
        onClick={handleFetchUser}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
        Get User Info
        </button>

        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

        {userData && (
        <div className="mt-4 p-4 border rounded bg-gray-50 space-y-1">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Email Verified:</strong> {userData.email_verified ? "Yes" : "No"}</p>
            <p><strong>User Type:</strong> {userData.user_type}</p>
            <p><strong>Deletion Requested:</strong> {userData.deletion_requested ? "Yes" : "No"}</p>
            <p><strong>Active:</strong> {userData.active ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {new Date(userData.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(userData.updated_at).toLocaleString()}</p>
        </div>
        )}
    </div>
    );

};

export default UserDetails;
