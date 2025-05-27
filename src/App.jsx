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

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Deshboard />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/profile/delete-request" element={<ProfileDeleteRequest />} />
        <Route path="/profile/resend-verification" element={< ResendVerification />} />
        <Route path="/profile/reset-password" element={< PasswordReset />} />
      </Routes>
    </>
  );
};

export default App;