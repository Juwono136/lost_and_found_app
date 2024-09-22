import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center space-x-2 shadow-md">
      <IoCheckmarkCircleOutline size={24} />
      <span>{message}</span>
      <button
        className="ml-2 text-green-700 hover:text-green-900"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default SuccessAlert;
