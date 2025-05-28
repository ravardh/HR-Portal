import React, { useState } from "react";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FiUserX, FiUser } from "react-icons/fi";
import Profile from "../../components/user/profile";
import Payslip from "../../components/user/payslip";
import Leave from "../../components/user/leave";
import Calender from "../../components/user/calender";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem("user")) || {
        fullName: "",
        department: "",
        position: "",
        email: "",
        phone: "",
        birthday: "",
        gender: "",
        profilePic: "",
      }
    );
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser((prev) => ({ ...prev, profilePic: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setShowModal(false);
  };

  return (
    <div className="max-w-[90vw] mx-auto mt-8">
      <div className="bg-white mb-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-600">{user.department.toUpperCase()}</p>
              <p className="text-gray-500 text-sm">{user.position}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              <span className="flex">
                {" "}
                <span>
                  <FiUser className="h-5 w-5 mr-2" />
                </span>{" "}
                <span> Update Profile</span>{" "}
              </span>
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer">
              <HiOutlineLogout className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-0 bg-white border-b border-gray-200">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
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
