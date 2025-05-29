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
import UserList from './pages/UserList';
import UpdateUser from './pages/UserUpdate';
import UserDelete from './pages/UserDelete';
import PromoteToAdmin from './pages/PromoteToAdmin';
import UserDetails from './pages/UserDetails';
import PromoteToModerator from './pages/PromoteToModerator';
import UserDemote from './pages/UserDemote';
import ChangeUserRole from './pages/UserRoleChange';
import RegistrationVerify from './pages/RegistrationVerify';
import SetNewPassword from './pages/SetNewPassword';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* profile/auth routers */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<RegistrationVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/verify/password-reset" element={<SetNewPassword />} />
        <Route path="/dashboard" element={<Deshboard />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/profile/permissions" element={<ProfilePermissions />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/profile/delete-request" element={<ProfileDeleteRequest />} />
        <Route path="/profile/resend-verification" element={<ResendVerification />} />

        {/* role and permission routers */}
        <Route path="/admin/permissions" element={< Permissions />} />
        <Route path="/admin/permission/:id" element={< PermissionDetails />} />
        <Route path="/admin/roles" element={< Roles />} />
        <Route path="/admin/role/:id" element={< RoleDetails />} />
        <Route path="/admin/role/create" element={< RoleCreate />}/>
        <Route path="/admin/roles/delete" element={< RoleDelete />}/>
        <Route path="/admin/roles/update" element={< RoleUpdate />}/>

        {/* user routers */}
        <Route path="/users" element={< UserList />} />
        <Route path="/user/edit" element={< UpdateUser />} />
        <Route path="/user/delete" element={< UserDelete />} />
        <Route path="/users/promote/admin" element={< PromoteToAdmin />} />
        <Route path="/users/detail" element={< UserDetails />} />
        <Route path="/users/promote/moderator" element={< PromoteToModerator />}/>
        <Route path="/user/demote" element={< UserDemote />} />
        <Route path="users/change-role" element={< ChangeUserRole />} />
        <Route path="users/update" element={< UpdateUser />} />
        {/* localhost:8080/api/v1/auth/verify */}
      </Routes>
    </>
  );
};

export default App;