import React from "react";

import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

const Alert = ({ type = "success", message, onClose }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-100" : "bg-red-100";
  const borderColor = isSuccess ? "border-green-400" : "border-red-400";
  const textColor = isSuccess ? "text-green-700" : "text-red-700";
  const icon = isSuccess ? (
    <IoCheckmarkCircleOutline size={24} />
  ) : (
    <IoCloseCircleOutline size={24} />
  );

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded flex items-center space-x-2 shadow-md`}
    >
      {icon}
      <span>{message}</span>
      <button className={`ml-2 hover:${textColor}`} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
