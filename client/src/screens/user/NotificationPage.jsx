import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBarComponent";
import NavigationBar from "../../components/NavigationBar";
import ChevronDownIcon from "../../assets/chevron-down-icon.svg";
import ChevronUpIcon from "../../assets/chevron-up-icon.svg";
import VerifyItemModal from "../../components/VerifyItemModal"; // Import the VerifyItemModal

const NotificationPage = () => {
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false); // Track modal visibility
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item for verification
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "claim",
      title: "Claim Submitted",
      message: "Your claim has been submitted.",
      date: "12/12/2023",
      status: 0,
    },
    {
      id: 2,
      type: "claim",
      title: "Under Review",
      message: "Your claim is under review.",
      date: "12/13/2023",
      status: 1,
    },
    {
      id: 3,
      type: "founder",
      title: "Found Item Pending Approval",
      message: "Please confirm and verify the item you found.",
      date: "12/14/2023",
      itemId: 101,
    },
  ];

  const toggleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const handleApproveItem = (itemId) => {
    setSelectedItemId(itemId);
    setIsVerifyModalVisible(true); // Show the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsVerifyModalVisible(false); // Close modal
    setSelectedItemId(null);
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

              <p className="text-sm text-gray-700">{notification.message}</p>
              <p className="text-xs text-gray-400">{notification.date}</p>

              {expandedNotification === notification.id && (
                <div className="mt-4">
                  {notification.type === "claim" ? (
                    <div className="flex justify-center">
                      <ProgressBar currentStatus={notification.status} />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproveItem(notification.itemId);
                        }}
                      >
                        Verify and Approve
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <NavigationBar activeTab="notifications" />

      {isVerifyModalVisible && (
        <VerifyItemModal
          isVisible={isVerifyModalVisible}
          onClose={handleModalClose}
          itemId={selectedItemId}
        />
      )}
    </div>
  );
};

export default NotificationPage;
