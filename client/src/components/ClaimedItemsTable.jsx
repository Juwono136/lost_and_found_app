import React, { useState } from "react";
import DetailsModal from "./DetailsModal"; // Modal component to show details

const ClaimedItemsTable = ({ claimedItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date Claimed</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {claimedItems.map((item) => (
            <tr
              key={item.id}
              className="border-b text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(item)}
            >
              <td className="px-4 py-2 ellipsis">{item._id}</td>
              <td className="px-4 py-2">{item.claimed_by}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.item_desc}</td>
              <td className="px-4 py-2">{item.claim_date}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "claimed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2">{item.publishedAt}</td>
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

export default ClaimedItemsTable;
