import React, { useState } from "react";
import DetailsModal from "./DetailsModal"; // Modal component to show details

const LostItemsTable = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Location Found</th>
            <th className="px-4 py-2">Storing Location</th>
            <th className="px-4 py-2">Date Reported</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(item)}
            >
              <td className="px-4 py-2 ellipsis">{item._id}</td>
              <td className="px-4 py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.item_desc}</td>
              <td className="px-4 py-2">{item.found_at}</td>
              <td className="px-4 py-2">{item.storing_location}</td>
              <td className="px-4 py-2">{item.date_reported}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "waiting for approval"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Modal when an item is selected */}
      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default LostItemsTable;
