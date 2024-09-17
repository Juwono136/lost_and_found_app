import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import VerifyItemModal from "../../components/VerifyItemModal"; // Import the VerifyItemModal

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false); // Track modal visibility
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item for verification
  const navigate = useNavigate();

  // Notification Types Map
  const notificationTypes = {
    claimSubmitted: {
      title: "Claim Submitted",
      message: "Your claim for the item has been submitted.",
    },
    underReview: {
      title: "Under Review",
      message: "Your claim for the item is currently under review.",
    },
    itemFoundPendingApproval: {
      title: "Found Item Pending Approval",
      message: "Please confirm and verify the item you found.",
    },
  };

  // Simulate fetching notifications data (you can replace this with a real API call)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulated fetch call
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 1,
              type: "claimSubmitted",
              itemName: "iPhone",
              status: "waiting",
              date: "12/12/2023",
              itemId: 1, // Item identifier
            },
            {
              id: 2,
              type: "underReview",
              itemName: "MacBook Pro",
              status: "under review",
              date: "12/13/2023",
              itemId: 2,
            },
            {
              id: 3,
              type: "itemFoundPendingApproval",
              itemName: "AirPods",
              status: "waiting for approval",
              date: "12/14/2023",
              itemId: 101,
            },
          ]);
        }, 100)
      );

      setNotifications(response); // Set the fetched notifications
    };

    fetchNotifications();
  }, []);

  // Function to handle the "Detail" button click
  const handleDetailClick = (itemId) => {
    navigate(`/status/${itemId}`);
  };

  // Function to handle item approval for founders
  const handleApproveItem = (itemId) => {
    setSelectedItemId(itemId);
    setIsVerifyModalVisible(true); // Show the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsVerifyModalVisible(false); // Close modal
    setSelectedItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 pt-10 px-4">Notifications</h1>

      <div className="px-4 space-y-4">
        {notifications.map((notification) => {
          const notificationType = notificationTypes[notification.type];

          return (
            <div
              key={notification.id}
              className="bg-white rounded-lg shadow-md p-4 relative flex flex-col"
            >
              <div className="flex justify-between items-start">
                {/* Notification Title */}
                <h3 className="text-md font-bold">{notificationType.title}</h3>
              </div>

              {/* Notification Message */}
              <p className="text-sm text-gray-700">
                {notificationType.message.replace(
                  "item",
                  notification.itemName
                )}
              </p>

              {/* Notification Date */}
              <p className="text-xs text-gray-400">{notification.date}</p>

              {/* Spacer div to push button to the bottom */}
              <div className="flex-grow" />

              {/* Detail or Verify Button */}
              {notification.type === "claimSubmitted" ||
              notification.type === "underReview" ? (
                <div className="flex justify-start">
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-gray-500 text-white rounded-full"
                    onClick={() => handleDetailClick(notification.itemId)}
                  >
                    Detail
                  </button>
                </div>
              ) : (
                <div className="flex justify-start">
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-blue-500 text-white rounded-full"
                    onClick={() => handleApproveItem(notification.itemId)}
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <NavigationBar activeTab="notifications" />

      {/* Verify Item Modal */}
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
