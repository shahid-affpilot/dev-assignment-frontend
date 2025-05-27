import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleDelete = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch roles when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/roles', {
          withCredentials: true
        });
        if (response.data.status === "202") {
          setRoles(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async () => {
    if (!selectedRole) {
      setError('Please select a role to delete');
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/roles/${selectedRole.id}`,
        { withCredentials: true }
      );

      if (response.data.status === "200") {
        navigate('/admin/roles', {
          state: { message: response.data.message }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete role');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading roles...</div>;

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Delete Role
        </h2>

        <div className="mb-6">
          <label 
            htmlFor="role-select" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Role to Delete
          </label>
          <select
            id="role-select"
            value={selectedRole?.id || ''}
            onChange={(e) => {
              const role = roles.find(r => r.id === e.target.value);
              setSelectedRole(role);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Role Details:</h3>
            <p className="text-sm text-gray-600">Name: {selectedRole.name}</p>
            <p className="text-sm text-gray-600">Description: {selectedRole.description}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/roles')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || !selectedRole}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              (deleting || !selectedRole) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {deleting ? 'Deleting...' : 'Delete Role'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleDelete;