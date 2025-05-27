import React from 'react'
import { Link, useNavigate } from 'react-router-dom'  // Add useNavigate import

const NavBar = () => {
  const userType = localStorage.getItem('user_type')
  const navigate = useNavigate()  // Add this hook

  const handleLogout = () => {
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    navigate('/')  // Navigate to root directory
  }

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              Affpilot AI
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {userType ? (
                <>
                  <Link to="/dashboard" className="text-white hover:underline">
                    Dashboard
                  </Link>
                  <Link to="/profile/view" className="text-white hover:underline">
                    Profile
                  </Link>
                  <Link to="/profile/update" className="text-white hover:underline">
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="text-white hover:underline">
                    Register
                  </Link>
                  <Link to="/login" className="text-white hover:underline">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
