import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CalendarIcon from "../assets/calendar-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import ClaimItemModal from "./ClaimItemModal";
import VerifyItemModal from "./VerifyItemModal";

const ItemsCardComponent = ({ item, showDetailButton }) => {
  const [isClaimModalVisible, setIsClaimModalVisible] = useState(false);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const openClaimModal = () => {
    setIsClaimModalVisible(true);
  };

  const closeClaimModal = () => {
    setIsClaimModalVisible(false);
  };

  const openVerifyModal = () => {
    setIsVerifyModalVisible(true);
  };

  const closeVerifyModal = () => {
    setIsVerifyModalVisible(false);
  };

  const handleDetailClick = (itemId) => {
    navigate(`/status/${itemId}`);
  };

  return (
    <div className="w-full bg-white shadow-lg shadow-gray-400 rounded-lg p-4 flex flex-col justify-between">
      {/* Title, Description */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-xl text-left">{item.title}</h2>
          <p className="text-sm text-left">{item.description}</p>
        </div>

        {/* Claim Button for Claimable Items */}
        {item.status === "waiting" && (
          <button
            onClick={openClaimModal}
            className="text-xs font-bold px-4 py-2 bg-blue-500 text-white text-base rounded-full"
          >
            Claim
          </button>
        )}

        {/* Verify Button for Founders */}
        {item.status === "waiting for approval" && (
          <button
            onClick={openVerifyModal}
            className="text-xs font-bold px-4 py-2 bg-blue-500 text-white text-base rounded-full"
          >
            Verify
          </button>
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
              item.status === "waiting" ||
              item.status === "waiting for approval"
                ? "border-blue-500 text-blue-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {item.status === "waiting" ? "Waiting" : "Claimed"}
          </div>
        </div>

        {/* Detail Button (only appears if showDetailButton is true) */}
        {showDetailButton && (
          <button
            onClick={() => handleDetailClick(item.id)}
            className="text-xs font-bold px-4 py-2 bg-gray-500 text-white text-base rounded-full"
          >
            Detail
          </button>
        )}
      </div>

      {/* Claim Item Modal */}
      {isClaimModalVisible && (
        <ClaimItemModal
          item={item}
          isVisible={isClaimModalVisible}
          onClose={closeClaimModal}
        />
      )}

      {/* Verify Item Modal */}
      {isVerifyModalVisible && (
        <VerifyItemModal
          item={item}
          isVisible={isVerifyModalVisible}
          onClose={closeVerifyModal}
        />
      )}
    </div>
  );
};

export default ItemsCardComponent;
