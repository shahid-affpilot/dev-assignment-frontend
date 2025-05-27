import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Deshboard from './pages/Dashboard';
import ProfileView from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import ProfileDeleteRequest from './pages/ProfileDeleteRequest';
import ResendVerification from './pages/ResendVerification';
import PasswordReset from './pages/PasswordReset';
import ProfilePermissions from './pages/ProfilePermissions';
import Permissions from './pages/Permissions';
import PermissionDetails from './pages/PermissionDetails';
import Roles from './pages/Roles';
import RoleDetails from './pages/RoleDetails';
import RoleCreate from './pages/RoleCreate';
import RoleDelete from './pages/RoleDelete';
import RoleUpdate from './pages/RoleUpdate';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* profile/auth routers */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Deshboard />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/profile/permissions" element={<ProfilePermissions />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/profile/delete-request" element={<ProfileDeleteRequest />} />
        <Route path="/profile/resend-verification" element={< ResendVerification />} />
        <Route path="/profile/reset-password" element={< PasswordReset />} />

        {/* role and permission routers */}
        <Route path="admin/permissions" element={< Permissions />} />
        <Route path="admin/permission/:id" element={< PermissionDetails />} />
        <Route path="admin/roles" element={< Roles />} />
        <Route path="admin/role/:id" element={< RoleDetails />} />
        <Route path="admin/role/create" element={< RoleCreate />}/>
        <Route path="admin/roles/delete" element={< RoleDelete />}/>
        <Route path="admin/roles/update" element={< RoleUpdate />}/>
        
      </Routes>
    </>
  );
};

export default App;