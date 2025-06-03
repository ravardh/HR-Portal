import React, { useState, useEffect } from "react";
import {
  HiOutlineLogout,
  HiOutlineCash,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FiUserX, FiUser } from "react-icons/fi";
import EmployeeProfile from "../../components/user/Profile.jsx";
import EmployeePayslip from "../../components/user/Payslip.jsx";
import EmployeeLeave from "../../components/user/Leave.jsx";
import EmployeeCalendar from "../../components/user/Calender.jsx";
import UpdateEmployeeModal from "../../components/user/UpdateProfileModal.jsx";


import axios from "axios";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/employee/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error("Failed to fetch employee profile", error);
      }
    };

    fetchEmployee();
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-[90vw] mx-auto mt-8">
      <div className="bg-white mb-6 p-4 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Profile Image & Info */}
          <div className="flex sm:flex-row justify-center items-center gap-4">
            <div>
              <img
                src={employee.profilePic || "/default-avatar.png"}
                alt={employee.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="sm:text-left">
              <h2 className="text-2xl font-bold">{employee.fullName}</h2>
              <p className="text-gray-600">
                {employee.department?.toUpperCase() || ""}
              </p>
              <p className="text-gray-500 text-sm">{employee.position}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-2 items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FiUser className="h-5 w-5 mr-2" />
              Update Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <HiOutlineLogout className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-5 border-b border-gray-200">
          <TabButton
            label="Profile"
            icon={<FiUser className="h-5 w-5 mr-2" />}
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            label="Payslip"
            icon={<HiOutlineCash className="h-5 w-5 mr-2" />}
            isActive={activeTab === "payslip"}
            onClick={() => setActiveTab("payslip")}
          />
          <TabButton
            label="Leave"
            icon={<FiUserX className="h-5 w-5 mr-2" />}
            isActive={activeTab === "leave"}
            onClick={() => setActiveTab("leave")}
          />
          <TabButton
            label="Calendar"
            icon={<HiOutlineCalendar className="h-5 w-5 mr-2" />}
            isActive={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px] p-5">
          {activeTab === "profile" && <EmployeeProfile employee={employee} />}
          {activeTab === "payslip" && <EmployeePayslip employeeId={employee._id} />}
          {activeTab === "leave" && <EmployeeLeave employeeId={employee._id} />}
          {activeTab === "calendar" && <EmployeeCalendar />}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <UpdateEmployeeModal
          showModal={showModal}
          setShowModal={setShowModal}
          employee={employee}
        />
      )}
    </div>
  );
};

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

export default EmployeeDashboard;
