import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/me', {
      withCredentials: true,
    })
      .then(response => {
        setUser(response.data.data);    
        console.log(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        {user.verified ? (
          <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full font-medium">
            Verified
          </span>
        ) : (
          <a
            href="/profile/resend-verification"
            className="px-4 py-1 bg-red-100 text-red-800 rounded-full font-medium hover:bg-red-200"
          >
            Verify Profile
          </a>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-gray-500">Name:</label>
          <p className="text-lg text-gray-700">{user.first_name} {user.last_name}</p>
        </div>
        <div>
          <label className="text-gray-500">Email:</label>
          <p className="text-lg text-gray-700">{user.email}</p>
        </div>
        <div>
          <label className="text-gray-500">Username:</label>
          <p className="text-lg text-gray-700">{user.username}</p>
        </div>
        <div>
          <label className="text-gray-500">User Type:</label>
          <p className="text-lg text-gray-700 capitalize">{user.role}</p>
        </div>
        <div>
          <label className="text-gray-500">Email Verified:</label>
          <p className="text-lg text-gray-700">{user.verified ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <label className="text-gray-500">Created At:</label>
          <p className="text-lg text-gray-700">{new Date(user.created_at).toLocaleString()}</p>
        </div>
        <div>
          <label className="text-gray-500">Last Updated:</label>
          <p className="text-lg text-gray-700">{new Date(user.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
