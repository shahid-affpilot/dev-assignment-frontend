import React from 'react';
import { Link } from 'react-router-dom';

const ActionItem = ({ title, description, to }) => (
  <Link to={to} className="block">
    <div className="p-4 bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="font-semibold text-yellow-800">{title}</h3>
      <p className="text-sm text-yellow-600">{description}</p>
    </div>
  </Link>
);

const ModeratorPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Moderator Tools</h2>
      <p className="text-gray-500">Moderate users and content</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionItem title="View Users" description="Browse all user profiles" to="/moderator/users" />
        <ActionItem title="Delete User" description="Remove users if needed" to="/moderator/delete-user" />
      </div>
    </div>
  );
};

export default ModeratorPanel;
