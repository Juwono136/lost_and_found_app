import React, { useState, useEffect } from "react";
import AddItemModal from "../../components/AddItemModal";
import LostItemsTable from "../../components/LostItemsTable";
import ClaimedItemsTable from "../../components/ClaimedItemsTable";
import { AdminHeader } from "../../components/HeaderComponent";
import axiosInstance from "../../service/axios";

const AdminDashboard = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [claimedItems, setClaimedItems] = useState([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const userId = 1; // Assume logged-in admin user

  const fetchData = async () => {
    try {
      // Fetch meeting requests
      const meetingResponse = await axiosInstance.get("/meeting/");
      const fetchedMeetings = meetingResponse.data.meetings.map((meeting) => ({
        id: meeting._id,
        userId: meeting.user_id,
        userName: meeting.user_name, // Not yet connected
        itemId: meeting.item_id,
        itemName: meeting.item.name,
        dateRequested: new Date(meeting.meeting_date).toLocaleDateString(),
        timeRequested: new Date(meeting.meeting_date).toLocaleTimeString(),
        location: meeting.location || "Pos Security",
        status: meeting.status,
      }));
      setMeetingRequests(fetchedMeetings);

      // Fetch lost items
      const itemsResponse = await axiosInstance.get("/items/");
      const fetchedItems = itemsResponse.data.items.filter(
        (item) => item.status !== "claimed"
      );
      setItems(fetchedItems);

      // Fetch claimed items
      const claimedItemsResponse = await axiosInstance.get("/items/");
      const fetchedClaimedItems = claimedItemsResponse.data.items.filter(
        (item) => item.status === "claimed"
      );
      setClaimedItems(fetchedClaimedItems);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle approve/decline actions
  const handleApproveMeeting = async (meetingId) => {
    try {
      await axiosInstance.put(`/meeting/approve/${meetingId}`);
      fetchData(); // Refresh data after approving
    } catch (error) {
      console.error("Failed to approve meeting", error);
    }
  };

  const handleDeclineMeeting = async (meetingId) => {
    try {
      await axiosInstance.put(`/meeting/decline/${meetingId}`);
      fetchData(); // Refresh data after declining
    } catch (error) {
      console.error("Failed to decline meeting", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <AdminHeader userName="John Doe" userRole="Admin" />

      <div className="p-6">
        {/* Meeting Requests Table */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Meeting Requests</h2>
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Item ID</th>
                <th className="px-4 py-2">Date Requested</th>
                <th className="px-4 py-2">Time Requested</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetingRequests.map((request) => (
                <tr key={request.id} className="border-b text-sm">
                  <td className="px-4 py-2 ellipsis">{request.id}</td>
                  <td className="px-4 py-2">{request.userName}</td>
                  <td className="px-4 py-2 ellipsis">{request.itemId}</td>
                  <td className="px-4 py-2">{request.itemName}</td>
                  <td className="px-4 py-2 ellipsis">{request.userId}</td>
                  <td className="px-4 py-2">{request.dateRequested}</td>
                  <td className="px-4 py-2">{request.timeRequested}</td>
                  <td className="px-4 py-2">{request.location}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "submitted"
                          ? "bg-yellow-100 text-yellow-600"
                          : request.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : request.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {request.status === "submitted" ? (
                      <>
                        <button
                          onClick={() => handleApproveMeeting(request.id)}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclineMeeting(request.id)}
                          className="text-red-500 hover:underline"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span>No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lost Items Table */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mt-8">Lost Items</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setIsAddItemModalOpen(true)}
          >
            Add Item
          </button>
        </div>
        <LostItemsTable items={items} />

        {/* Claimed Items History Table */}
        <h2 className="text-xl font-bold mt-8">Claimed Items History</h2>
        <ClaimedItemsTable claimedItems={claimedItems} />

        {/* Add Item Modal */}
        {isAddItemModalOpen && (
          <AddItemModal
            onClose={() => setIsAddItemModalOpen(false)}
            onAddItem={(newItem) => setItems([...items, newItem])}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
