import React, { useState } from "react";
import axios from "axios";

const UserDelete = () => {
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleDeleteUser = async () => {
        if (!userId.trim()) {
            setError("Please enter a user ID.");
            setMessage("");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete user ID: ${userId}?`);
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/users/${userId}`, {
            withCredentials: true,
        });

        const { status, message } = response.data;
        if (status === 200) {
            setMessage(message || "User deleted successfully.");
            setError("");
        } else {
            setError(message || "Failed to delete user.");
            setMessage("");
        }
        } catch (err) {
            setError("An error occurred while deleting the user.");
            setMessage("");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Delete User by ID</h1>

        <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
            onClick={handleDeleteUser}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
            Delete User
        </button>

        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
        </div>
    )
}

export default UserDelete