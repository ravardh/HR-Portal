import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin, isAdmin } = useAuth();

  const getDashboardLink = () => {
    return isAdmin ? "/admin-dashboard" : "/dashboard";
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-indigo-700 tracking-wide">
          RAJ <span className="text-gray-600">HOMES</span>
        </h1>
      </div>

      <nav className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/aboutus" className="text-gray-700 hover:text-blue-500">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-500">
          Contact Us
        </Link>
        
        {isLogin ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              {user?.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold text-indigo-600">
                  {user?.fullName?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <Link 
              to={getDashboardLink()} 
              className="text-gray-700 hover:text-blue-500"
            >
              {user?.fullName}
              {isAdmin && <span className="ml-2 text-sm text-indigo-600">(Admin)</span>}
            </Link>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
