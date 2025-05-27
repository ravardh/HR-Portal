import React, { useState } from "react";
import { HiOutlineLogout, HiOutlineCash, HiOutlineCalendar } from "react-icons/hi";
import { FiUserX ,FiUser } from "react-icons/fi";
import { MdOutlineLinkedCamera } from "react-icons/md";
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "Vineet Pancheshw", // Changed to actual user name
    department: "Human Resources",
    position: "HR Manager",
   
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUser(prev => ({...prev, image: event.target.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <div className="max-w-[90vw] mx-auto mt-8">
      <div className="bg-white mb-6">
        {/* User Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(user.name)}
                </div>
              )}
              <label 
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600"
              >
                <MdOutlineLinkedCamera className="h-4 w-4" />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.department}</p>
              <p className="text-gray-500 text-sm">{user.position}</p>
            </div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
            <HiOutlineLogout className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-0 bg-white border-b border-gray-200">
          <button
            onClick={() => handleTabChange("profile")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${activeTab === "profile" ? "border-blue-500 text-blue-600 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 "}`}
          >
            <FiUser  className="h-5 w-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => handleTabChange("payslip")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${activeTab === "payslip" ? "border-blue-500 text-blue-600 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            <HiOutlineCash className="h-5 w-5 mr-2" />
            Payslip
          </button>
          <button
            onClick={() => handleTabChange("leave")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${activeTab === "leave" ? "border-blue-500 text-blue-600 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            <FiUserX className="h-5 w-5 mr-2" />
            Leave
          </button>
          <button
            onClick={() => handleTabChange("calendar")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${activeTab === "calendar" ? "border-blue-500 text-blue-600 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            <HiOutlineCalendar className="h-5 w-5 mr-2" />
            Calendar
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] p-5">
          {activeTab === "profile" && (
            <div>Profile content will be displayed here</div>
          )}
          {activeTab === "payslip" && (
            <div>Payslip content will be displayed here</div>
          )}
          {activeTab === "leave" && (
            <div>Leave content will be displayed here</div>
          )}
          {activeTab === "calendar" && (
            <div>Calendar content will be displayed here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
