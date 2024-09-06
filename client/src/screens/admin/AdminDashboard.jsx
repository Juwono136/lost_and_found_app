import React, { useState } from "react";
import AddItemModal from "../../components/AddItemModal";
import LostItemsTable from "../../components/LostItemsTable";
import ClaimedItemsTable from "../../components/ClaimedItemsTable";
import { AdminHeader } from "../../components/HeaderComponent";

const AdminDashboard = () => {
  // Sample meeting requests data
  const meetingRequests = [
    {
      id: 1,
      name: "John Doe",
      item: "iPhone",
      dateRequested: "12/12/2023",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      item: "MacBook Pro",
      dateRequested: "10/12/2023",
      status: "Approved",
    },
  ];

  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPhone",
      description: "Black, 128GB, New Condition",
      location_found: "Lobby",
      location_item_store: "Admin Office",
      date_reported: "2023-12-12",
      status: "Waiting",
      publishedAt: "2023-12-12",
    },
    {
      id: 2,
      name: "MacBook Pro",
      description: "Silver, 256GB, Like New",
      location_found: "Library",
      location_item_store: "Security Office",
      date_reported: "2023-12-10",
      status: "Claimed",
      publishedAt: "2023-12-10",
    },
    // More lost items data
  ]);

  const [claimedItems, setClaimedItems] = useState([
    {
      id: 1,
      user_id: 101,
      user_name: "John Doe",
      name: "iPhone",
      description: "Black, 128GB, New Condition",
      location_found: "Lobby",
      date_reported: "2023-12-12",
      date_claimed: "2023-12-13",
      status: "Claimed",
      publishedAt: "2023-12-12",
    },
    {
      id: 2,
      user_id: 102,
      user_name: "Jane Smith",
      name: "MacBook Pro",
      description: "Silver, 256GB, Like New",
      location_found: "Library",
      date_reported: "2023-12-10",
      date_claimed: "2023-12-11",
      status: "Claimed",
      publishedAt: "2023-12-10",
    },
    // More claimed items data
  ]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleEditItem = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <AdminHeader userName="John Doe" userRole="Admin" />

      <div className="p-6">
        {/* Meeting Requests (Notifications) Table */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Meeting Requests</h2>
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Date Requested</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetingRequests.map((request) => (
                <tr key={request.id} className="border-b text-sm">
                  <td className="px-4 py-2">{request.name}</td>
                  <td className="px-4 py-2">{request.item}</td>
                  <td className="px-4 py-2">{request.dateRequested}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline mr-2">
                      Approve
                    </button>
                    <button className="text-red-500 hover:underline">
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Item Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mt-8">Lost Items</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setIsAddItemModalOpen(true)}
          >
            Add Item
          </button>
        </div>

        {/* Lost Items Table */}
        <LostItemsTable items={items} onEditItem={handleEditItem} />

        {/* Claimed Items History Table */}
        <h2 className="text-xl font-bold mt-8">Claimed Items History</h2>
        <ClaimedItemsTable claimedItems={claimedItems} />

        {/* Add Item Modal */}
        {isAddItemModalOpen && (
          <AddItemModal
            onClose={() => setIsAddItemModalOpen(false)}
            onAddItem={handleAddItem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
