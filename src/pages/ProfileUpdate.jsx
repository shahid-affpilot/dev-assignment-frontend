import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
  });
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/me', { withCredentials: true })
      .then(res => {
        console.log(res)
        const { id, username, first_name, last_name } = res.data.data;
        setForm({ username, first_name, last_name });
        setUserId(id);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Failed to load user info');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/users/${userId}`,
        form,
        { withCredentials: true }
      );
      setSuccessMsg(res.data.message || 'Updated successfully');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Update failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Profile</h2>

      {successMsg && <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">{successMsg}</div>}
      {errorMsg && <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">First Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Last Name</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
