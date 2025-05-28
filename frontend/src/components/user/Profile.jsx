import React, { useEffect, useState } from "react";
import axios from "../../config/api.jsx";
import Cookies from "js-cookie";

import {
  FiMail,
  FiUser,
  FiBriefcase,
  FiPhone,
  FiCalendar,
  FiBookOpen,
} from "react-icons/fi";
import { BsCake2 } from "react-icons/bs";
import { FaTransgenderAlt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("user/profile", {});

        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          throw new Error("User data not found");
        }
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load profile. Please login again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white ">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiMail /> Email
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiPhone /> Phone Number
          </h3>
          <p className="text-gray-600">{user.phone}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <BsCake2 /> Birthday
          </h3>
          <p className="text-gray-600">{user.dob}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FaTransgenderAlt /> Gender
          </h3>
          <p className="text-gray-600">{user.gender.toUpperCase()}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiBriefcase /> Position
          </h3>
          <p className="text-gray-600">{user.position}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiBriefcase /> Department
          </h3>
          <p className="text-gray-600">{user.department.toUpperCase()}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiBookOpen /> Qualification
          </h3>
          <p className="text-gray-600">{user.qualification}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FiCalendar /> Hiring Date
          </h3>
          <p className="text-gray-600">{user.hiringDate}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <GiTakeMyMoney /> Salary
          </h3>
          <p className="text-gray-600">₹ {user.salary}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2 ">
            <GrStatusGood />
            Status
          </h3>
          <p className="text-gray-600">{user.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
