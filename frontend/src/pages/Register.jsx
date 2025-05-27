import { useState } from "react";
import axios from "axios";

const Register = () => {
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

  const handelSubmit = async (e) => {
    e.preventDefault();

    //we also validate the data at this point
    console.log(data);

    const res = await axios.post("http://localhost:4500/auth/register", data);
    console.log(res.data);
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-100 p-6">
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
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="John Doe"
              value={data.fullName}
              onChange={handelChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="example@mail.com"
              value={data.email}
              onChange={handelChange}
              required
            />
          </div>
          {/* phone */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="9876543210"
              value={data.phone}
              onChange={handelChange}
              required
            />
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

          {/* DOB */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={data.dob}
              onChange={handelChange}
              required
            />
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
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="********"
              value={data.crPassword}
              onChange={handelChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-blue-900 font-medium">
              Confirm Password
            </label>
            <input
              type="text"
              name="password"
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="********"
              value={data.password}
              onChange={handelChange}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-3 rounded-full transition duration-300 shadow-xl"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
