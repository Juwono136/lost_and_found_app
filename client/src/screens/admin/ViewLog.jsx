import React, { useState, useEffect } from "react";
import axiosInstance from "../../service/axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";

const ViewLog = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/notification/read-all");
        console.log("Fetched Notifications:", response.data);
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notifications.");
        console.error("Error fetching notifications:", err);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to format the date and time for created_at
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Pagination state and logic
  const itemsPerPage = 15; // Set the max number of rows per page to 15
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  // Calculate the starting and ending index for the current page
  const indexOfLastNotification = currentPage * itemsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;

  // Slice the notifications array to get the current page items
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Handler functions for pagination buttons
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Notification Logs</h2>
        <div className="flex space-x-4">
          <button className="flex items-center border border-gray-300 bg-white text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100">
            <LuListFilter className="mr-3" />
            Filter
          </button>
          <button className="border border-gray-300 bg-white text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100">
            Download all
          </button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No.</th> {/* Number Column */}
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification, index) => (
                <tr
                  key={notification._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {/* Number Column */}
                  <td className="py-3 px-6">
                    {indexOfFirstNotification + index + 1}
                  </td>{" "}
                  {/* Show number based on index */}
                  <td className="py-3 px-6">{notification.title}</td>
                  <td className="py-3 px-6">{notification.type}</td>
                  <td className="py-3 px-6">
                    {formatDateTime(notification.created_at)}
                  </td>
                  <td className="py-3 px-6">{notification.user_id}</td>
                  <td className="py-3 px-6 space-x-4">
                    <button
                      onClick={() =>
                        console.log("Edit notification:", notification._id)
                      }
                    >
                      <FiEdit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() =>
                        console.log("Delete notification:", notification._id)
                      }
                    >
                      <FiTrash className="h-4 w-4 text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewLog;
