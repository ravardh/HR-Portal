import React, { useState } from "react";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FiUserX, FiUser } from "react-icons/fi";
import { MdOutlineLinkedCamera } from "react-icons/md";
import Profile from "../../components/user/profile";
import Payslip from "../../components/user/payslip";
import Leave from "../../components/user/leave";
import Calender from "../../components/user/calender";
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(() => {
    const userData = JSON.parse(sessionStorage.getItem("user")) || {
      name: "",
      department: "",
      position: "",
    };
    return userData;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUser((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto mt-8">
      <div className="bg-white mb-6">
        {/* User Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />

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
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-600">{user.department.toUpperCase()}</p>
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
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 "
            }`}
          >
            <FiUser className="h-5 w-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => handleTabChange("payslip")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${
              activeTab === "payslip"
                ? "border-blue-500 text-blue-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <HiOutlineCash className="h-5 w-5 mr-2" />
            Payslip
          </button>
          <button
            onClick={() => handleTabChange("leave")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${
              activeTab === "leave"
                ? "border-blue-500 text-blue-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FiUserX className="h-5 w-5 mr-2" />
            Leave
          </button>
          <button
            onClick={() => handleTabChange("calendar")}
            className={`px-6 py-3 flex items-center border-b-2 cursor-pointer  ${
              activeTab === "calendar"
                ? "border-blue-500 text-blue-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <HiOutlineCalendar className="h-5 w-5 mr-2" />
            Calendar
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] p-5">
          {activeTab === "profile" && (
            <Profile />
          )}
          {activeTab === "payslip" && (
            <Payslip />
          )}
          {activeTab === "leave" && (
            <Leave />
          )}
          {activeTab === "calendar" && (
            <Calender />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
