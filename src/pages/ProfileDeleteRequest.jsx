import React, { useState } from 'react';
import axios from 'axios';

const ProfileDeleteRequest = () => {
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteRequest = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setStatus('error');
      setMessage('User ID not found in localStorage.');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/users/${userId}/request-deletion`,
        {},
        { withCredentials: true }
      );

      setStatus('success');
      setMessage(res.data.message || 'Account deletion requested successfully.');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to request account deletion.');
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Account Deletion</h1>

      {!status && !showConfirm && (
        <>
          <p className="text-gray-700 mb-4">You can request account deletion below.</p>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Request Account Deletion
          </button>
        </>
      )}

      {showConfirm && (
        <div className="bg-red-50 p-4 rounded shadow mt-4">
          <p className="text-red-700 mb-4 font-medium">Are you sure you want to delete your account?</p>
          <div className="flex gap-4">
            <button
              onClick={handleDeleteRequest}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status === 'success' && <p className="text-green-600 mt-4">{message}</p>}
      {status === 'error' && <p className="text-red-600 mt-4">{message}</p>}
    </div>
  );
};

export default ProfileDeleteRequest;
