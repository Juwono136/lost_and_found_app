import React, { useState } from "react";
import { createPortal } from "react-dom";

const VerifyItemModal = ({ item, isVisible, onClose }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isVisible) return null;

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-2xl w-full p-6 max-w-md">
        <h2 className="text-lg font-bold mb-4">Verify Item</h2>
        <p className="mb-4 text-gray-600">
          Verify the item and confirm that the information is true.
        </p>

        {/* Terms and Conditions */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={isConfirmed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="terms-checkbox" className="text-gray-600 text-sm">
            I have read the{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              !isConfirmed && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isConfirmed}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VerifyItemModal;
