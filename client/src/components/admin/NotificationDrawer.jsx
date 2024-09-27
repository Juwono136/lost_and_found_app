import React from "react";
import { IoClose } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationDrawer = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white w-92 max-w-md h-full shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4"
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <IoNotificationsOutline className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold">{notification.title}</h4>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
