import React, { useState, useEffect } from "react";
import FilterIcon from "../assets/filter-icon.svg";
import SearchIcon from "../assets/search-icon.svg";
import FilterModal from "./user/FilterModal"; // Import the FilterModal component
import AppLogo from "../assets/app-logo-white.png"; // Import app logo
import { FaRegBell } from "react-icons/fa";
import { getUserInfo } from "../service/UserService";
import { useNavigate } from "react-router-dom";

// User Header
const Header = ({ onSearchChange, onSearchFocus }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  // this can be propagated from Lost, revision for later
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData.personal_info);
        // console.log("User: ", userData);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSearchChangeWeb = (event) => {
    onSearchChange(event.target.value); // Send search term to LostMainScreen
  };

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div
        className={`px-5 py-4 pt-10 md:hidden transition-opacity ${
          isFocused ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-transform ${
            isFocused ? "transform -translate-y-12" : ""
          }`}
        >
          <h1 className="text-2xl font-bold text-white">
            Hello, {user?.name || "User Name"}
          </h1>
        </div>

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
            onClick={handleOpenFilter}
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
            onChange={handleSearchChangeWeb}
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

          <div className="relative">
            <div
              className="flex items-center bg-white p-1 pl-4 rounded-full space-x-2"
              onClick={toggleDropdown}
            >
              <span className="text-sm text-gray-700">
                {user?.name || "User Name"}
              </span>
              <img
                src={user?.avatar || "https://via.placeholder.com/50x50"}
                alt="Profile Pic"
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/claimed-items")}
            >
              Claimed Items
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/found-items")}
            >
              Found Items
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              // onClick={handleLogout}
            >
              Log Out
            </li>
          </ul>
        </div>
      )}

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
