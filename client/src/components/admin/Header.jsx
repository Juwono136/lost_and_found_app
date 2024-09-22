import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationDrawer from "./NotificationDrawer";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  return (
    <header className="w-full bg-white shadow p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-200 p-3 rounded-full" onClick={toggleDrawer}>
          <FaRegBell className="text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>

        <div className="flex items-center bg-gray-200 p-1 pl-4 rounded-full space-x-2">
          <span className="text-sm text-gray-700">Admin Name</span>
          <img
            src="https://via.placeholder.com/50x50"
            alt="Profile Pic"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      <NotificationDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        notifications={notifications}
      />
    </header>
  );
};

export default Header;
