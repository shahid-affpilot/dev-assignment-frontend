import React from 'react';
import { Link } from 'react-router-dom';

const ActionItem = ({ title, description, to }) => (
  <Link to={to} className="block">
    <div className="p-4 bg-purple-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="font-semibold text-purple-800">{title}</h3>
      <p className="text-sm text-purple-600">{description}</p>
    </div>
  </Link>
);

const SystemAdminPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">System Admin Panel</h2>
      <p className="text-gray-500">Top-level platform operations</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionItem title="Promote to Admin" description="Upgrade user to admin role" to="/users/promote/admin" />
      </div>
    </div>
  );
};

export default SystemAdminPanel;
