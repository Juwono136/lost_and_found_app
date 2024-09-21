import React, { useState } from "react";
import { createPortal } from "react-dom";

const AddItemModal = ({ onClose, onAddItem }) => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(), // Generate a unique ID
      name,
      description,
      location,
      storing,
      dateReported,
      userId,
      status,
    };
    onAddItem(newItem);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-lg font-bold mb-4">Add Lost Item</h2>

        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Status</option>
            <option value="Waiting">Waiting</option>
            <option value="Claimed">Claimed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddItemModal;
