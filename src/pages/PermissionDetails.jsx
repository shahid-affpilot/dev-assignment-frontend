import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PermissionDetails = () => {
  const { id } = useParams();
  const [permission, setPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPermissionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/permission/${id}`, {
          withCredentials: true
        });
        if (response.data.status === "200") {
          setPermission(response.data.data);
          setMessage(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch permission details');
        setLoading(false);
      }
    };

    fetchPermissionDetails();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!permission) return <div className="text-center p-4">Permission not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Permission Details</h1>
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Permission Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {permission.name}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{permission.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Resource</dt>
            <dd className="mt-1 text-sm text-gray-900">{permission.resource}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Action</dt>
            <dd className="mt-1 text-sm text-gray-900">{permission.action}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{permission.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(permission.created_at).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(permission.updated_at).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PermissionDetails;