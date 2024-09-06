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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Location Found</th>
            <th className="px-4 py-2">Stored At</th>
            <th className="px-4 py-2">Date Reported</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.location_found}</td>
              <td className="px-4 py-2">{item.location_item_store}</td>
              <td className="px-4 py-2">{item.date_reported}</td>
              <td className="px-4 py-2">
                <select
                  value={item.status}
                  onChange={(e) =>
                    onEditItem({ ...item, status: e.target.value })
                  }
                  className="px-2 py-1 border border-gray-300 rounded-md"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="Claimed">Claimed</option>
                </select>
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
