import React from "react";
import { useNavigate } from "react-router-dom";
import HomeGreyIcon from "../assets/home-grey-icon.svg";
import HomeBlueIcon from "../assets/home-blue-icon.svg";
import ProfileGreyIcon from "../assets/profile-grey-icon.svg";
import ProfileBlueIcon from "../assets/profile-blue-icon.svg";
import BellGreyIcon from "../assets/bell-grey-icon.svg";
import BellBlueIcon from "../assets/bell-blue-icon.svg";

const NavigationBar = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-4 border-t border-gray-200">
      {/* Home Tab */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img
          src={activeTab === "home" ? HomeBlueIcon : HomeGreyIcon}
          alt="Home"
          className="w-6 h-6"
        />
        <span
          className={`text-xs mt-1 ${
            activeTab === "home" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Home
        </span>
      </div>

      {/* Profile Tab */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <img
          src={activeTab === "profile" ? ProfileBlueIcon : ProfileGreyIcon}
          alt="Profile"
          className="w-6 h-6"
        />
        <span
          className={`text-xs mt-1 ${
            activeTab === "profile" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Profile
        </span>
      </div>

      {/* Notification Tab */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/notifications")}
      >
        <img
          src={activeTab === "notifications" ? BellBlueIcon : BellGreyIcon}
          alt="Notification"
          className="w-6 h-6"
        />
        <span
          className={`text-xs mt-1 ${
            activeTab === "notifications" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          History
        </span>
      </div>
    </div>
  );
};

export default NavigationBar;
