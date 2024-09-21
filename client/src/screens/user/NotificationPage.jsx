import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import VerifyItemModal from "../../components/VerifyItemModal";
import axiosInstance from "../../service/axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get(
          `/notification/read/${userId}`
        );
        console.log("Fetched notifications:", response.data);
        const notificationsData = response.data;

        const notificationsWithStatus = await Promise.all(
          notificationsData.map(async (notification) => {
            if (notification.item_id) {
              try {
                const itemResponse = await axiosInstance.get(
                  `/items/${notification.item_id}`
                );
                return {
                  ...notification,
                  item_status: itemResponse.data.status, // Add item status to notification
                };
              } catch (error) {
                console.error(
                  `Failed to fetch status for item ${notification.item_id}`,
                  error
                );
                return { ...notification, item_status: null };
              }
            } else {
              return notification;
            }
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
    console.log("Notification clicked:", notification); // Add this log to check the notification object

    if (!notification.read) {
      try {
        console.log("Notification ID:", notification._id); // Log the ID to see if it's undefined

        // Send the PUT request to mark the notification as read
        const response = await axiosInstance.put(
          `/notification/change_status/${notification._id}` // Use the correct notification ID
        );

        if (response.status === 200) {
          setNotifications((prevNotifications) =>
            prevNotifications.map((n) =>
              n._id === notification._id ? { ...n, read: true } : n
            )
          );
        } else {
          console.error(
            "Failed to update notification status on server:",
            response
          );
        }
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    if (notification.type === "verification_request") {
      setSelectedItemId(notification.item_id);
      // console.log("Item passed to modal:", notification.item_id);
      setIsVerifyModalVisible(true);
    } else {
      navigate(`/status/${notification.item_id}`);
    }
  };

  const handleModalClose = () => {
    setIsVerifyModalVisible(false);
    setSelectedItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 pt-10 px-4">Notifications</h1>

      <div className="px-4 space-y-4">
        {notifications.map((notification) => {
          const createdAt = new Date(
            notification.created_at.$date
          ).toLocaleString();

          return (
            <div
              key={notification._id}
              className={`bg-white rounded-lg shadow-md p-4 relative flex flex-col ${
                !notification.read ? "border-l-4 border-blue-500" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between items-start">
                {/* Notification Title */}
                <h3 className="text-md font-bold">{notification.title}</h3>
                {/* {!notification.read && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )} */}
              </div>

              {/* Notification Message */}
              <p className="text-sm text-gray-700">{notification.message}</p>

              {/* Notification Date */}
              <p className="text-xs text-gray-400">{createdAt}</p>

              <div className="flex-grow" />

              <div className="flex justify-start">
                {notification.item_status === "waiting for approval" ? (
                  <button
                    className="mt-2 px-4 py-2 text-xs bg-blue-500 text-white rounded-full"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    Verify
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
