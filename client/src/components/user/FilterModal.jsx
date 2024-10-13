import React, { useState, useEffect } from "react";
import ClearIcon from "../../assets/clear-icon.svg";

const FilterModal = ({ isVisible, onClose, onApply }) => {
  const [sortBy, setSortBy] = useState(""); // "oldest" or "newest"
  const [category, setCategory] = useState("");
  const [campus, setCampus] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsClosing(false); // Reset state when modal becomes visible again
    }
  }, [isVisible]);

  const handleApply = () => {
    onApply({ sortBy, category, campus, area, date });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match with the transition duration
  };

  const handleClear = () => {
    setSortBy("");
    setCategory("");
    setCampus("");
    setArea("");
    setDate("");
  };

  if (!isVisible && !isClosing) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white w-full rounded-t-xl p-4 transition-transform transform duration-300 ${
          isClosing ? "translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Close Icon */}
        <button onClick={handleClose} className="absolute top-4 right-4">
          <img src={ClearIcon} alt="Close" className="w-4 h-4" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">Filter Items</h2>

        {/* Sort By */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Sort by</h3>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full border ${
                sortBy === "oldest"
                  ? "bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
              onClick={() => setSortBy("oldest")}
            >
              From Oldest
            </button>
            <button
              className={`px-4 py-2 rounded-full border ${
                sortBy === "newest"
                  ? "bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
              onClick={() => setSortBy("newest")}
            >
              From Newest
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Category</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {/* Add categories here */}
            <option value="tech">Tech</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Location</h3>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
          >
            <option value="">Select Campus</option>
            <option value="senayan">Senayan</option>
            <option value="alam-sutera">Alam Sutera</option>
            <option value="kemanggisan">Kemanggisan</option>
          </select>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Area</option>
            <option value="student-lounge">Student Lounge</option>
            <option value="class">Class</option>
            <option value="lobby">Lobby</option>
            {/* Add more areas here */}
          </select>
        </div>

        {/* Date */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Date</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={handleClear}
          >
            Clear Filter
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
