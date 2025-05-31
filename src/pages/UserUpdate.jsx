import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
  });
  const [updatedUser, setUpdatedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (!userId.trim()) {
      setError("User ID is required.");
      setMessage("");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/users/${userId}`,
        formData,
        { withCredentials: true }
      );

      const { status, data, message } = response.data;
      if (status === 200) {
        setUpdatedUser(data);
        setMessage(message || "User updated successfully.");
        setError("");
      } else {
        setError("Failed to update user.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred during update.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>

      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Update Profile
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {updatedUser && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Updated User Info</h2>
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Field</th>
                <th className="border px-2 py-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(updatedUser).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-2 py-1 font-medium">{key}</td>
                  <td className="border px-2 py-1">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
