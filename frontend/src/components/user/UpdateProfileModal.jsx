import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

const UpdateProfileModal = ({ showModal, setShowModal }) => {
  const [user, setUser] = useState({
    fullName: "",
    department: "",
    position: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePic: "",
    qualification: "",
    address: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  }, []);

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
    localStorage.setItem("userData", JSON.stringify(user));
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Update Profile
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Image Upload */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative">
            <div className=" w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 mb-4 shadow">
              <img
                src={
                  user.profilePic ||
                  "https://via.placeholder.com/150?text=No+Image"
                }
                alt={user.fullName || "Profile Picture"}
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center cursor-pointer shadow hover:bg-gray-100 transition">
                <FaCamera className="text-gray-700 text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            </div>
            <label className="text-sm font-medium mb-2">
              Update Profile Image
            </label>
          </div>

          {/* Right - Form Fields */}
          <div className="md:w-2/3 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h3 className="text-xl font-semibold">{user.fullName}</h3>
              <div className="space-x-4 text-sm">
                <span>
                  <strong>Dept:</strong> {user.department?.toUpperCase()}
                </span>
                <span>
                  <strong>Position:</strong> {user.position}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                type="email"
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />

              <InputField
                label="Date of Birth"
                name="dob"
                value={user.dob}
                onChange={handleInputChange}
                type="date"
              />
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <InputField
              label="Address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded mt-1"
    />
  </div>
);

export default UpdateProfileModal;
