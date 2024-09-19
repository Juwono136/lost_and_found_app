import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../assets/calendar-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import ClaimItemModal from "./ClaimItemModal";
import VerifyItemModal from "./VerifyItemModal";

const ItemsCardComponent = ({
  item,
  showDetailButton,
  showClaimButton = true,
  loggedInUserId,
}) => {
  const [isClaimModalVisible, setIsClaimModalVisible] = useState(false);
  const [isClaimed, setIsClaimed] = useState(
    item.status === "claimed" || item.status === "on hold"
  );

  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [itemStatus, setItemStatus] = useState(item.status); // Use state to track item status
  const navigate = useNavigate();

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

  const handleDetailClick = (item) => {
    navigate(`/status/${item.id}`, { state: { item } });
  };

  const handleStatusChange = (newStatus) => {
    setItemStatus(newStatus);
  };

  const handleClaimSuccess = () => {
    setIsClaimed(true);
    closeClaimModal();
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
        {showClaimButton && itemStatus === "active" && (
          <button
            onClick={openClaimModal}
            className="text-xs font-bold px-4 py-2 bg-blue-500 text-white text-base rounded-full"
          >
            Claim
          </button>
        )}

        {/* Verify Button for Founders */}
        {itemStatus === "waiting for approval" &&
          item.foundedBy === loggedInUserId && (
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

          <div>
            {/* Check for active, claimed, and on hold status */}
            {itemStatus === "active" ||
            itemStatus === "claimed" ||
            itemStatus === "on hold" ? (
              <div
                className={`px-3 py-1 text-[12px] flex items-center justify-center rounded-full border ${
                  itemStatus === "active"
                    ? "border-blue-500 text-blue-500"
                    : itemStatus === "claimed"
                    ? "border-red-500 text-red-500"
                    : "border-yellow-500 text-yellow-500" // Style for "on hold"
                }`}
              >
                {itemStatus === "active"
                  ? "Active"
                  : itemStatus === "claimed"
                  ? "Claimed"
                  : "On Hold"}
              </div>
            ) : null}
          </div>
        </div>

        {/* Detail Button (only appears if showDetailButton is true) */}
        {showDetailButton && (
          <button
            onClick={() => handleDetailClick(item)}
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
          userId={loggedInUserId}
          isVisible={isClaimModalVisible}
          onClose={closeClaimModal}
          onClaimSuccess={handleClaimSuccess}
        />
      )}

      {/* Verify Item Modal */}
      {isVerifyModalVisible && (
        <VerifyItemModal
          item={item}
          isVisible={isVerifyModalVisible}
          onClose={closeVerifyModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default ItemsCardComponent;
