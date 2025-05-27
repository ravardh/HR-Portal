import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>
      <form className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white py-3 rounded-3xl text-lg font-semibold shadow-lg transition duration-300
            bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
