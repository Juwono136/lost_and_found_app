import React, { useState } from "react";
import CalendarIcon from "../assets/calendar-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import ClaimItemModal from "./ClaimItemModal";

const ItemsCardComponent = ({ item, onClick }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="w-full bg-white shadow-lg shadow-gray-400 rounded-lg p-4 flex flex-col justify-between"
      onClick={onClick}
    >
      {/* Title, Description, and Claim Button */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-xl text-left">{item.title}</h2>
          <p className="text-sm text-left">{item.description}</p>
        </div>
        {item.status === "waiting" && (
          <button
            onClick={openModal}
            className="text-xs font-bold px-4 py-2 bg-blue-500 text-white text-base rounded-full"
          >
            Claim
          </button>
        )}

        {/* Claim Item Modal */}
        {isModalVisible && (
          <ClaimItemModal
            item={item}
            isVisible={isModalVisible}
            onClose={closeModal}
          />
        )}
      </div>

      {/* Location, Date, and Time */}
      <div className="mt-2 text-sm text-gray-500 flex flex-col space-y-1">
        <div className="flex items-center">
          <img src={LocationIcon} alt="Location" className="w-4 h-4 mr-1" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center">
          <img src={CalendarIcon} alt="Calendar" className="w-4 h-4 mr-1" />
          <span>
            {item.date}, {item.time}
          </span>
        </div>
      </div>

      {/* Category Pill and Status Pill */}
      <div className="mt-4 flex justify-between items-end">
        <div className="flex space-x-2 items-center">
          <div className="px-3 py-1 bg-[#F1EDED] text-xs text-[#858585] rounded-full">
            {item.category}
          </div>
          <div
            className={`px-3 py-1 text-[12px] flex items-center justify-center rounded-full border ${
              item.status === "waiting"
                ? "border-blue-500 text-blue-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {item.status === "waiting" ? "Waiting" : "Claimed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCardComponent;
