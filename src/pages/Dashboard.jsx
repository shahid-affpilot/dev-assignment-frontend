import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPanel from '../components/UserPanel';
import ModeratorPanel from '../components/ModeratorPanel';
import AdminPanel from '../components/AdminPanel';
import SystemAdminPanel from '../components/SystemAdminPanel';

const Dashboard = () => {
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const type = localStorage.getItem('user_type');
        if (!type) {
            navigate('/');
        } else {
            setUserType(type);
        }
    }, [navigate]);

    const renderPanels = () => {
        switch (userType) {
            case 'system_admin':
                return (
                    <>
                        <UserPanel />
                        <ModeratorPanel />
                        <AdminPanel />
                        <SystemAdminPanel />
                    </>
                );
            case 'admin':
                return (
                    <>
                        <UserPanel />
                        <ModeratorPanel />
                        <AdminPanel />
                    </>
                );
            case 'moderator':
                return (
                    <>
                        <UserPanel />
                        <ModeratorPanel />
                    </>
                );
            case 'user':
            default:
                return <UserPanel />;
        }
    };

    
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                </div>
                <p className="text-gray-600 mb-6">Logged in as: <strong>{userType}</strong></p>

                <div className="flex flex-col gap-6">
                    {renderPanels()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;