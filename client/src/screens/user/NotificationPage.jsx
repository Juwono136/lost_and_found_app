import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBarComponent"; // Importing the reusable ProgressBar component
import NavigationBar from "../../components/NavigationBar";
import ChevronDownIcon from "../../assets/chevron-down-icon.svg"; // Import your down arrow SVG
import ChevronUpIcon from "../../assets/chevron-up-icon.svg"; // Import your up arrow SVG

const NotificationPage = () => {
  const [expandedNotification, setExpandedNotification] = useState(null); // Track expanded notification

  const notifications = [
    {
      id: 1,
      title: "Claim Submitted",
      message: "Your claim has been submitted.",
      date: "12/12/2023",
      status: 0,
    },
    {
      id: 2,
      title: "Under Review",
      message: "Your claim is under review.",
      date: "12/13/2023",
      status: 1,
    },
  ];

  const toggleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6 pt-10 px-4">Notifications</h1>

      <ul className="divide-y divide-gray-300">
        {notifications.map((notification) => (
          <li key={notification.id} className="cursor-pointer">
            <div
              className="flex flex-col p-4"
              onClick={() => toggleExpand(notification.id)}
            >
              {/* Notification Title with Chevron */}
              <div className="flex justify-between items-center">
                <h3 className="text-md font-bold">{notification.title}</h3>
                <img
                  src={
                    expandedNotification === notification.id
                      ? ChevronUpIcon
                      : ChevronDownIcon
                  }
                  alt="Chevron"
                  className="w-4 h-4"
                />
              </div>

              {/* Notification Message */}
              <p className="text-sm text-gray-700">{notification.message}</p>

              {/* Notification Date */}
              <p className="text-xs text-gray-400">{notification.date}</p>

              {/* Expandable Progress Bar */}
              {expandedNotification === notification.id && (
                <div className="mt-4 flex justify-center">
                  <ProgressBar currentStatus={notification.status} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom Navigation */}
      <NavigationBar activeTab="notifications" />
    </div>
  );
};

export default NotificationPage;
