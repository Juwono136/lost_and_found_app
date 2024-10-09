import React, { useState } from "react";
import BellIcon from "../assets/bell-icon.svg";
import FilterIcon from "../assets/filter-icon.svg";
import SearchIcon from "../assets/search-icon.svg";
import FilterModal from "./FilterModal"; // Import the FilterModal component
import UserIcon from "../assets/default-profile.png"; // Add user icon for admin

const user = JSON.parse(localStorage.getItem('user'));
const userMessage = user.message.substring(2)

// User Header
const Header = ({ onSearchFocus }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const handleFocus = () => {
    setIsFocused(true);
    onSearchFocus(); // Trigger screen transition to search
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
    <div
      className={`px-5 py-2 pt-10 transition-opacity ${
        isFocused ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Top Section with Greeting and Button */}
      <div
        className={`flex items-center justify-between transition-transform ${
          isFocused ? "transform -translate-y-12" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-white">{userMessage}</h1>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-lg">
            <img src={BellIcon} alt="Bell" className="w-6 h-6" />
          </span>
        </button>
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
          onFocus={handleFocus} // Trigger screen transition to search
        />
        <img
          src={FilterIcon}
          alt="Filter"
          className="w-6 h-6 cursor-pointer"
          onClick={handleOpenFilter} // Open the filter modal on click
        />
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

// Admin Header
const AdminHeader = ({ userName, userRole }) => {
  return (
    <div className="bg-[#4880EE] text-white flex justify-between items-center px-6 py-4">
      {/* Left side - Title */}
      <div>
        <h1 className="text-xl font-bold">Lost and Found</h1>
        <p className="text-sm">Admin Dashboard</p>
      </div>

      {/* Right side - User Info */}
      <div className="flex items-center">
        <div className="mr-4 text-right">
          <h3 className="text-md">{userName}</h3>
          <p className="text-sm">{userRole}</p>
        </div>
        <img src={UserIcon} alt="User Icon" className="w-6 h-6" />
      </div>
    </div>
  );
};

export { Header, AdminHeader };
