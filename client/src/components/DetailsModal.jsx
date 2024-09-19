import React from "react";

const DetailsModal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Item Details</h2>

        {/* Display item details */}
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {item._id}
          </p>
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Description:</strong> {item.item_desc}
          </p>
          <p>
            <strong>Location Found:</strong> {item.found_at}
          </p>
          <p>
            <strong>Storing Location:</strong> {item.storing_location}
          </p>
          <p>
            <strong>Date Reported:</strong>{" "}
            {new Date(item.date_reported).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
