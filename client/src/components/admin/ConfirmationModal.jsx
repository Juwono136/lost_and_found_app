import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "bg-red-600", // Customize the confirm button color for different actions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            <IoClose className="h-8 w-8" />
          </button>
        </div>

        {/* Modal Message */}
        <p className="mb-4">{message}</p>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`${confirmButtonColor} text-white px-4 py-2 rounded-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
