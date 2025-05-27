import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    qualification: "",
    department: "",
    position: "",
    hiringDate: "",
    salary: "",
    crPassword: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};

    // Name validation
    if (!/^[a-zA-Z\s]{3,30}$/.test(data.fullName.trim())) {
      tempErrors.fullName =
        "Name should be 3-30 characters and contain only letters";
    }

    // Email validation
    if (
      !/^[a-zA-Z_\d]+@(gmail.com|ricr.in|rajgroup.co|rajdigital.com)$/.test(
        data.email
      )
    ) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(data.phone)) {
      tempErrors.phone =
        "Phone number should be 10 digits valid indian phone number";
    }

    // Age validation
    const birthDate = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 21) {
      tempErrors.dob = "Age should be at least 21 years";
    }

    // Password validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.crPassword
      )
    ) {
      tempErrors.crPassword =
        "Password must be at least 8 characters, include uppercase, lowercase, number and special character";
    }

    // Password match validation
    if (data.crPassword !== data.password) {
      tempErrors.password = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4500/auth/register",
        data
      );
      toast.success("Registration successful!");
      setData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        qualification: "",
        department: "",
        position: "",
        hiringDate: "",
        salary: "",
        crPassword: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Modify input fields to show errors, here's an example for the name field:
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handelSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              placeholder="John Doe"
              value={data.fullName}
              onChange={handelChange}
              required
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              placeholder="example@mail.com"
              value={data.email}
              onChange={handelChange}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          {/* Phone */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              placeholder="9876543210"
              value={data.phone}
              onChange={handelChange}
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              value={data.dob}
              onChange={handelChange}
              required
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center text-gray-800">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                  checked={data.gender === "male"}
                  onChange={handelChange}
                  required
                />
                Male
              </label>
              <label className="flex items-center text-gray-800">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-2"
                  checked={data.gender === "female"}
                  onChange={handelChange}
                  required
                />
                Female
              </label>
            </div>
          </div>


          {/* Qualification */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Qualification
            </label>
            <select
              name="qualification"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={data.qualification}
              onChange={handelChange}
              required
            >
              <option value="">Select</option>
              <option value="highschool">High School</option>
              <option value="bachelors">Bachelors</option>
              <option value="masters">Masters</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Department
            </label>
            <select
              name="department"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={data.department}
              onChange={handelChange}
              required
            >
              <option value="">Select</option>
              <option value="hr">HR</option>
              <option value="it">Information Technology</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
              <option value="support">Customer Support</option>
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Position
            </label>
            <input
              type="text"
              name="position"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. Team Lead"
              value={data.position}
              onChange={handelChange}
              required
            />
          </div>

          {/* Hiring Date */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Hiring Date
            </label>
            <input
              type="date"
              name="hiringDate"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={data.hiringDate}
              onChange={handelChange}
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Salary (₹)
            </label>
            <input
              type="number"
              name="salary"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={data.salary}
              onChange={handelChange}
              required
            />
          </div>

          {/* Create Password */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Create Password
            </label>
            <input
              type="password"
              name="crPassword"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.crPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              placeholder="********"
              value={data.crPassword}
              onChange={handelChange}
              required
            />
            {errors.crPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.crPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-3 rounded-xl bg-white/60 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              placeholder="********"
              value={data.password}
              onChange={handelChange}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 
              text-white font-bold py-3 rounded-full transition duration-300 shadow-xl
              disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
