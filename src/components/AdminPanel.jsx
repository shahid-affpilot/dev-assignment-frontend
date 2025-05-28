import React from 'react';
import { Link } from 'react-router-dom';

const ActionItem = ({ title, description, to }) => (
  <Link to={to} className="block">
    <div className="p-4 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="font-semibold text-green-800">{title}</h3>
      <p className="text-sm text-green-600">{description}</p>
    </div>
  </Link>
);

const AdminPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Admin Controls</h2>
      <p className="text-gray-500">Manage users, roles, and permissions</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionItem title="List Users" description="See all users" to="/users" />
        <ActionItem title="Update User" description="Edit user data" to="/users/update" />
        <ActionItem title="Change Role" description="Modify user roles" to="/users/change-role" />
        <ActionItem title="Promote to Moderator" description="Upgrade user role" to="/users/promote/moderator" />
        <ActionItem title="Demote Role" description="Lower user privileges" to="/user/demote" />
        <ActionItem title="All Roles" description="View roles in system" to="/admin/roles" />
        {/*<ActionItem title="Role Details" description="Inspect role info" to="/admin/roles/details" /> */}
        <ActionItem title="Create Role" description="Add new role" to="/admin/role/create" />
        <ActionItem title="Update Role" description="Change role settings" to="/admin/roles/update" />
        <ActionItem title="Delete Role" description="Remove a role" to="/admin/roles/delete" />
        <ActionItem title="Permissions" description="See all permissions" to="/admin/permissions" />
        {/*<ActionItem title="Permission Details" description="Permission info" to="/admin/permissions/details" /> */}
      </div>
    </div>
  );
};

export default AdminPanel;
