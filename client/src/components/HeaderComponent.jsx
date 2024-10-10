import React, { useState } from "react";
import BellIcon from "../assets/bell-icon.svg";
import FilterIcon from "../assets/filter-icon.svg";
import SearchIcon from "../assets/search-icon.svg";
import FilterModal from "./FilterModal"; // Import the FilterModal component
import UserIcon from "../assets/default-profile.png";
import AppLogo from "../assets/app-logo-white.png";

// User Header
const Header = ({ userName, onSearchFocus }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
        className={`px-5 py-2 pt-10 md:hidden transition-opacity mb-6 ${
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
      </div>

      {/* Web Header */}
      <div className="hidden md:flex items-center justify-between px-10 py-3 bg-blue-500">
        {/* Logo or Title */}
        <img src={AppLogo} alt="Company Logo" className="w-44" />

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-1 w-1/3">
          <img src={SearchIcon} alt="Search" className="w-6 h-6" />
          <input
            type="text"
            placeholder="Search for an item..."
            className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
          />
          <img
            src={FilterIcon}
            alt="Filter"
            className="w-6 h-6 cursor-pointer"
            onClick={handleOpenFilter} // Open the filter modal on click
          />
        </div>

        {/* User and Notification Icons */}
        <div className="flex items-center space-x-4">
          <img
            src={UserIcon}
            alt="User"
            className="w-8 h-8 rounded-full bg-white"
          />
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img src={BellIcon} alt="Bell" className="w-6 h-6" />
          </button>
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
