import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch current role data
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/roles/${id}`, {
          withCredentials: true
        });
        if (response.data.status === "202") {
          const { name, description } = response.data.data;
          setFormData({ name, description });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch role details');
        setLoading(false);
      }
    };

    fetchRole();
  }, [id]);

  const fetchRoleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/roles/${roleId}`, {
        withCredentials: true
      });
      if (response.data.status === "202") {
        const { name, description } = response.data.data;
        setFormData({ name, description });
        setShowForm(true);
      }
    } catch (err) {
      setError('Failed to fetch role details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/roles/${roleId}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.status === "202") {
        navigate('/admin/roles', {
          state: { message: response.data.message }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Role</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {!showForm && (
          <form onSubmit={fetchRoleDetails} className="space-y-6">
            <div>
              <label 
                htmlFor="roleId" 
                className="block text-sm font-medium text-gray-700"
              >
                Role ID
              </label>
              <input
                type="text"
                id="roleId"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
                placeholder="Enter role ID"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Fetching...' : 'Fetch Role'}
              </button>
            </div>
          </form>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700"
              >
                Role Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setRoleId('');
                  setFormData({ name: '', description: '' });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={updating}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  updating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updating ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RoleUpdate;