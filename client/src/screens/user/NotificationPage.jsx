import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import VerifyItemModal from "../../components/VerifyItemModal";
import axiosInstance from "../../service/axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(
          `/notification/read/${userId}`
        );
        const notificationsData = response.data;

        // Fetch item statuses and add them to the notifications
        const notificationsWithStatus = await Promise.all(
          notificationsData.map(async (notification) => {
            if (notification.item_id) {
              try {
                const itemResponse = await axiosInstance.get(
                  `/items/${notification.item_id}`
                );
                return {
                  ...notification,
                  item_status: itemResponse.data.status,
                };
              } catch (error) {
                console.error(
                  `Failed to fetch status for item ${notification.item_id}`,
                  error
                );
                return { ...notification, item_status: null };
              }
            }
            return notification;
          })
        );

        setNotifications(notificationsWithStatus);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        const response = await axiosInstance.put(
          `/notification/change_status/${notification.id}`
        );
        if (response.status === 200) {
          setNotifications((prevNotifications) =>
            prevNotifications.map((n) =>
              n._id === notification.id ? { ...n, read: true } : n
            )
          );
        }
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    // Handle different notification types and item statuses
    if (
      notification.type === "verification_request" &&
      notification.item_status === "waiting for approval"
    ) {
      setSelectedItemId(notification.item_id);
      setNotificationType("verification_request");
      setIsVerifyModalVisible(true);
    } else if (
      notification.type === "meeting_completed" &&
      notification.item_status === "on hold"
    ) {
      setSelectedItemId(notification.item_id);
      setNotificationType("claim_verification");
      setIsVerifyModalVisible(true);
    } else if (notification.item_status === "active") {
      console.log("Item is already verified.");
    } else {
      navigate(`/status/${notification.item_id}`);
    }
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setIsVerifyModalVisible(false);
    setSelectedItemId(null);
  };

  // Handle claim verification (PUT request to verify claim)
  const handleClaimVerification = async () => {
    try {
      const claimPayload = { claimed_by: userId };
      const response = await axiosInstance.put(
        `/items/claim/${selectedItemId}`,
        claimPayload
      );
      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.item_id === selectedItemId ? { ...n, item_status: "claimed" } : n
          )
        );
        handleModalClose();
      }
    } catch (error) {
      console.error("Error verifying item claim:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <h1 className="text-2xl font-bold mb-6 pt-10 px-4">Notifications</h1>

      <div className="px-4 space-y-4">
        {notifications.map((notification) => {
          const createdAt = new Date(
            notification.created_at.$date
          ).toLocaleString();

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md p-4 relative flex flex-col ${
                !notification.read ? "border-l-4 border-blue-500" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-md font-bold">{notification.title}</h3>
              </div>
              <p className="text-sm text-gray-700">{notification.message}</p>
              <p className="text-xs text-gray-400">{createdAt}</p>

              <div className="flex-grow" />

              {/* Buttons based on notification type and item status */}
              <div className="flex justify-start">
                {notification.type === "verification_request" &&
                notification.item_status === "waiting for approval" ? (
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-blue-500 text-white rounded-full"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    Verify
                  </button>
                ) : notification.type === "meeting_completed" &&
                  notification.item_status === "on hold" ? (
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-blue-500 text-white rounded-full"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    Verify Claim
                  </button>
                ) : notification.item_status === "active" ? (
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-gray-400 text-white rounded-full"
                    disabled
                  >
                    Verified
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <NavigationBar activeTab="notifications" />

      {/* Verify Item Modal */}
      {isVerifyModalVisible && notificationType === "verification_request" && (
        <VerifyItemModal
          isVisible={isVerifyModalVisible}
          onClose={handleModalClose}
          itemId={selectedItemId}
        />
      )}

      {/* Verify Claim Modal */}
      {isVerifyModalVisible && notificationType === "claim_verification" && (
        <VerifyItemModal
          isVisible={isVerifyModalVisible}
          onClose={handleModalClose}
          itemId={selectedItemId}
          isClaimVerification={true} // New prop for claim verification
          userId={userId} // Pass the user ID
          onVerify={handleClaimVerification} // Trigger claim verification
        />
      )}
    </div>
  );
};

export default NotificationPage;
