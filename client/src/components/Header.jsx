import React, { useState, useEffect } from "react";
import BellIcon from "../assets/bell-icon.svg";
import FilterIcon from "../assets/filter-icon.svg";
import SearchIcon from "../assets/search-icon.svg";
import FilterModal from "./user/FilterModal"; // Import the FilterModal component
import UserIcon from "../assets/default-profile.png"; // Add user icon for admin
import AppLogo from "../assets/app-logo-white.png"; // Import app logo
import { FaRegBell } from "react-icons/fa";

// User Header
const Header = ({ userName, onSearchFocus }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // const [userMessage, setUserMessage] = useState(""); // Add userMessage state

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && user.message) {
  //     const message = user.message.substring(2); // Extract substring as needed
  //     setUserMessage(message); // Set the userMessage state
  //   }
  // }, []);

  const handleFocus = () => {
    setIsFocused(true);
    onSearchFocus();
  };

  const handleOpenFilter = () => {
    setIsFilterVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterVisible(false);
  };

  const handleApplyFilter = (filterData) => {
    console.log("Filters applied:", filterData);
    handleCloseFilter();
  };

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div
        className={`px-5 py-4 pt-10 md:hidden transition-opacity ${
          isFocused ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Top Section with Greeting and Button */}
        <div
          className={`flex items-center justify-between transition-transform ${
            isFocused ? "transform -translate-y-12" : ""
          }`}
        >
          <h1 className="text-2xl font-bold text-white">Hello, {userName}</h1>
        </div>

        {/* Search Bar */}
        <div
          className={`relative mt-4 w-full flex items-center border border-gray-300 rounded-full bg-white px-4 py-1 transition-transform ${
            isFocused ? "transform -translate-y-12" : ""
          }`}
        >
          <img src={SearchIcon} alt="Search" className="w-6 h-6" />
          <input
            type="text"
            placeholder="Search for an item..."
            className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
            onFocus={handleFocus}
          />
          <img
            src={FilterIcon}
            alt="Filter"
            className="w-6 h-6 cursor-pointer"
            onClick={handleOpenFilter} // Open the filter modal on click
          />
        </div>
      </div>

      {/* Web Header */}
      <div className="hidden md:flex items-center justify-between p-4 bg-blue-500 shadow">
        <img src={AppLogo} alt="Company Logo" className="w-44" />

        <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-1 w-1/3">
          <img src={SearchIcon} alt="Search" className="w-6 h-6" />
          <input
            type="text"
            placeholder="Search for an item..."
            className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
          />
          {/* <img
            src={FilterIcon}
            alt="Filter"
            className="w-6 h-6 cursor-pointer"
            onClick={handleOpenFilter} // Open the filter modal on click
          /> */}
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <FaRegBell className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>

          <div className="flex items-center bg-white p-1 pl-4 rounded-full space-x-2">
            <span className="text-sm text-gray-700">User Name</span>
            <img
              src="https://via.placeholder.com/50x50"
              alt="Profile Pic"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
      />
    </div>
  );
};

export { Header };
