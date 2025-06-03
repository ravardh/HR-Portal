import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/api";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsAdmin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    emailID: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("auth/login", formData);
      const userData = response.data.user;

      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful!");

      // Navigate based on user role
      switch (userData.role) {
        case "Director":
          setIsAdmin(true);
          navigate("/director-dashboard");
          break;

        case "HOD":
          setIsAdmin(false);
          navigate("/hod-dashboard");
          break;

        case "Employee":
          setIsAdmin(false);
          navigate("/employee-dashboard"); // ✅ Fixed spelling here
          break;

        default:
          toast.error("Invalid role. Please contact admin.");
          break;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed, please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Welcome Back
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailID" className="block mb-1 text-gray-700">
            Email
          </label>
          <input
            id="emailID"
            type="email"
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white py-3 rounded-3xl text-lg font-semibold shadow-lg transition duration-300
            bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
