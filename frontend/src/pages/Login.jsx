import React, { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Admin credentials
    if (email === "admin123@gmail.com" && password === "admin123") {
      localStorage.setItem("userToken", "dummy-admin-token");
      localStorage.setItem("userType", "Admin");
      toast.success("Login successful");
      navigate("/dashboard"); // Navigate to admin dashboard
    } else {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userType = localStorage.getItem("userType");
    if (userToken && userType === "Admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md px-6 py-12 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Password *
            </label>
            <input
              type="password"
              placeholder="*******"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <CustomButton
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2"
          >
            Login <FiLogIn className="text-lg" />
          </CustomButton>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
