import React, { useState } from "react";
import EditItemModal from "./EditItemModal"; // Import the EditItemModal

const LostItemsTable = ({ items, onEditItem }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedItem) => {
    onEditItem(updatedItem);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Location Found</th>
            <th className="px-4 py-2">Date Reported</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="px-4 py-2">{item.id}</td>
              {/* Image column */}
              <td className="px-4 py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.location_found}</td>
              <td className="px-4 py-2">{item.date_reported}</td>
              {/* Static Status */}
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Waiting"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Item Modal */}
      {isEditModalOpen && currentItem && (
        <EditItemModal
          item={currentItem}
          onClose={() => setIsEditModalOpen(false)}
          onEditSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default LostItemsTable;
