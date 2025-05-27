import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoleDetails = () => {
  const { id } = useParams();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/roles/${id}`, {
          withCredentials: true
        });
        if (response.data.status === "202") {
          setRole(response.data.data);
          setMessage(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch role details');
        setLoading(false);
      }
    };

    fetchRoleDetails();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!role) return <div className="text-center p-4">Role not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Role Details</h1>
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Role Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                {role.name}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{role.id}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{role.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(role.created_at).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(role.updated_at).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default RoleDetails;