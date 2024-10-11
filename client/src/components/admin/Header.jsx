import React, { useState } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa"; // Import FaSearch
import NotificationDrawer from "./NotificationDrawer";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [notifications, setNotifications] = useState([
    // Dummy notifications (Replace with real fetched data)
    {
      title: "Item Approved",
      message: "Your item has been approved by the founder.",
      created_at: new Date(),
    },
    {
      title: "Meeting Request",
      message: "A new meeting request has been submitted.",
      created_at: new Date(),
    },
  ]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission (optional)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search logic here (e.g., filter data, make an API request, etc.)
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      {/* Search Box */}
      <div className="flex items-center">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center"
        >
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
          />
          {/* Search Icon Button */}
          <button
            type="submit"
            className="absolute right-3 text-gray-500 hover:text-gray-700"
          >
            <FaSearch className="text-xl" /> {/* Use FaSearch icon here */}
          </button>
        </form>
      </div>

      {/* Notification and Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {/* Notification Bell Icon */}
          <div
            className="bg-gray-200 p-3 rounded-full cursor-pointer"
            onClick={toggleDrawer}
          >
            <FaRegBell className="text-gray-600 hover:text-gray-800" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center bg-gray-200 p-1 pl-4 rounded-full space-x-2">
          <span className="text-sm text-gray-700">Admin Name</span>
          <img
            src="https://via.placeholder.com/50x50"
            alt="Profile Pic"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        notifications={notifications}
      />
    </header>
  );
};

export default Header;
