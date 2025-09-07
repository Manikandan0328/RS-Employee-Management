import React, { useState } from "react";
import { FiLogOut, FiBell, FiUser, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="border-b border-gray-300 p-2  px-9 py-4 bg-white w-full relative z-50">
      <div className="flex justify-between items-center w-full">
        {/* Left side - Title */}
        <h1
          className="font-bold text-4xl cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"
          onClick={() => navigate("/")}
        >
          RS-TECH
        </h1>

        {/* Right side - Icons */}
        <div className="flex items-center gap-6 relative text-gray-700 text-3xl">
          {/* Settings */}
          <FiSettings className="cursor-pointer hover:text-blue-600" />

          {/* Notifications */}
          <div className="relative cursor-pointer hover:text-blue-600">
            <FiBell />
            {/* Example notification badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>

          {/* User Profile */}
          <FiUser
            className="cursor-pointer hover:text-blue-600"
            onClick={() => setShowProfile(!showProfile)}
          />

          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute text-lg right-0 top-14 bg-white border shadow-lg rounded-lg w-64 p-4">
              <h3 className="text-lg font-semibold mb-2">Admin Profile</h3>
              <p>
                <span className="font-medium">Name:</span> John Doe
              </p>
              <p>
                <span className="font-medium">Email:</span> admin@example.com
              </p>
              <p>
                <span className="font-medium">Role:</span> Super Admin
              </p>
              <hr className="my-3" />
              <CustomButton
                variant="danger"
                onClick={logouthandler}
                className="w-full"
              >
                Logout
                <span className="ml-2">
                  <FiLogOut />
                </span>
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
