import React, { useEffect, useState } from 'react';

const ProfileDeleteRequest = () => {
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setStatus('error');
      setMessage('User ID not found in localStorage.');
      return;
    }
    console.log(userId)
    const requestDeletion = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/users/${userId}/request-deletion`, {
          method: 'POST',
          credentials: 'include',
        });
        const data = await res.json();
        console.log(data)

        if (res.ok) {
          setStatus('success');
          setMessage(res.message || 'Account deletion requested successfully.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to request account deletion.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error while requesting deletion.');
      }
    };

    requestDeletion();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Account Deletion</h1>
      {status === 'loading' && <p className="text-gray-500">Processing your request...</p>}
      {status === 'success' && <p className="text-green-600">{message}</p>}
      {status === 'error' && <p className="text-red-600">{message}</p>}
    </div>
  );
};

export default ProfileDeleteRequest;
