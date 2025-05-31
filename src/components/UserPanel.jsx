import React from 'react';
import { Link } from 'react-router-dom';

const ActionItem = ({ title, description, to }) => (
  <Link to={to} className="block">
    <div className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="font-semibold text-blue-800">{title}</h3>
      <p className="text-sm text-blue-600">{description}</p>
    </div>
  </Link>
);

const UserPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Manage Your Profile</h2>
      <p className="text-gray-500">Simple tools to manage your account information</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionItem title="View Profile" description="See your personal info" to="/profile/view" />
        <ActionItem title="View Permissions" description="See your personal permission" to="/profile/permissions" />
        <ActionItem title="Update Profile" description="Edit your name, email, etc." to="/profile/update" />
        <ActionItem title="Request Deletion" description="Ask to delete your account" to="/profile/delete-request" />
        <ActionItem title="Reset Password" description="Change your password" to="/reset-password" />
        <ActionItem title="Resend Verification" description="Send verification email again" to="/profile/resend-verification" />
      </div>
    </div>
  );
};

export default UserPanel;
