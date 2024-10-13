import React, { useState } from "react";
import { createPortal } from "react-dom";
import axiosInstance from "../../service/axios"; // Import axios instance

import { FaCalendar, FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import DefaultImg from "../../assets/default-profile.png";
import SuccessIcon from "../../assets/success-icon.svg";

const ClaimItemModal = ({ item, isVisible, onClose, userId }) => {
  const [step, setStep] = useState(1); // Steps: 1. Item details, 2. Meeting, 3. Success
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isVisible) return null;

  // Handle meeting confirmation (submit claim request)
  const handleConfirmMeeting = async () => {
    if (!meetingDate || !meetingTime) {
      alert("Please set a meeting date and time.");
      return;
    }

    setLoading(true);

    const claimPayload = {
      user_id: userId,
      item_id: item.id, //
      meeting_date: `${meetingDate} ${meetingTime}`,
      location: "pos security",
      status: "submitted",
    };

    try {
      await axiosInstance.post("/meeting/request", claimPayload);
      setStep(3);
    } catch (error) {
      console.error("Failed to submit claim request:", error);
      alert("Failed to submit the claim request.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-2xl w-full p-6 max-w-md">
        {step === 1 && (
          <>
            {/* Item Status */}
            <div className="mb-4">
              <span className="bg-gray-300 text-gray-600 text-xs px-4 py-2 rounded-full">
                Found
              </span>
            </div>

            {/* Item Title and Description */}
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* When and Where */}
            <div className="flex mb-4">
              <div className="flex-1">
                <h3 className="text-sm text-gray-500">When</h3>
                <div className="flex items-center">
                  <FaCalendar className="w-4 h-4 mr-1" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="w-4 h-4 mr-1" />
                  <span>{item.time}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-500">Where</h3>
                <div className="flex items-center">
                  <IoLocationSharp className="w-4 h-4 mr-2" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Received By */}
            <div className="mb-4">
              <h3 className="text-sm text-gray-500">Received by</h3>
              <div className="flex items-center mt-2">
                <img
                  src={DefaultImg}
                  alt={item.receivedBy}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <span className="font-bold">{item.receivedBy}</span>
              </div>
            </div>

            {/* Cancel and Claim Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Claim
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Set a meeting modal */}
            <h2 className="text-lg font-bold mb-4">Set a meeting</h2>
            <p className="mb-4 text-gray-600">
              Set up a meeting to collect your item from the finder.
            </p>

            {/* Date Input */}
            <div className="mb-4">
              <label className="block text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Time Input */}
            <div className="mb-4">
              <label className="block text-gray-500 mb-1">Time</label>
              <select
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="03:00 PM">3:00 PM</option>
                <option value="05:00 PM">5:00 PM</option>
              </select>
            </div>

            {/* Cancel and Confirm Buttons */}
            <div className="flex justify-between">
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={handleConfirmMeeting}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* Success message */}
            <div className="flex justify-center items-center mb-6">
              <img src={SuccessIcon} alt="Success" className="w-20 h-20" />
            </div>
            <h2 className="text-lg text-center mb-4">
              Your request has been sent and will be reviewed!
            </h2>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-blue-500 text-white w-full rounded-lg"
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ClaimItemModal;
