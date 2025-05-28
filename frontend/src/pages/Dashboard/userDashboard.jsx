import React, { useState, useEffect } from "react";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FiUserX, FiUser } from "react-icons/fi";
import Profile from "../../components/user/Profile";
import Payslip from "../../components/user/Payslip";
import Leave from "../../components/user/Leave";
import Calender from "../../components/user/Calender";
import UpdateProfileModal from "../../components/user/UpdateProfileModal";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Load user data from localStorage when component mounts
    const userData = JSON.parse(localStorage.getItem("userData")) || {
      fullName: "",
      department: "",
      position: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      profilePic: "",
    };
    setUser(userData);
  }, [showModal]); // Re-fetch when modal closes

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="max-w-[90vw] mx-auto mt-8">
      <div className="bg-white mb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Profile Image & Info */}
          <div className="flex sm:flex-row justify-center items-center gap-4">
            {/* Profile Image */}
            <div>
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="sm:text-left">
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-600">
                {user.department ? user.department.toUpperCase() : ""}
              </p>
              <p className="text-gray-500 text-sm">{user.position}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-2 items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full sm:w-auto"
            >
              <FiUser className="h-5 w-5 mr-2" />
              Update Profile
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full sm:w-auto">
              <HiOutlineLogout className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-5 sm:mt-0 mb-0 bg-white border-b border-gray-200">
          <TabButton
            label="Profile"
            icon={<FiUser className="h-5 w-5 mr-2" />}
            isActive={activeTab === "profile"}
            onClick={() => handleTabChange("profile")}
          />
          <TabButton
            label="Payslip"
            icon={<HiOutlineCash className="h-5 w-5 mr-2" />}
            isActive={activeTab === "payslip"}
            onClick={() => handleTabChange("payslip")}
          />
          <TabButton
            label="Leave"
            icon={<FiUserX className="h-5 w-5 mr-2" />}
            isActive={activeTab === "leave"}
            onClick={() => handleTabChange("leave")}
          />
          <TabButton
            label="Calendar"
            icon={<HiOutlineCalendar className="h-5 w-5 mr-2" />}
            isActive={activeTab === "calendar"}
            onClick={() => handleTabChange("calendar")}
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] p-5">
          {activeTab === "profile" && <Profile />}
          {activeTab === "payslip" && <Payslip />}
          {activeTab === "leave" && <Leave />}
          {activeTab === "calendar" && <Calender />}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <UpdateProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

// Reusable Tab Button
const TabButton = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 flex items-center border-b-2 cursor-pointer ${
      isActive
        ? "border-blue-500 text-blue-600 font-medium"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default UserDashboard;
