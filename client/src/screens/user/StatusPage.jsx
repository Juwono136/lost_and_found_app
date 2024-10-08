import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompletedStepIcon from "../../assets/completed-step-icon.svg";
import RejectedStepIcon from "../../assets/rejected-step-icon.svg";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";

const StatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { item } = location.state || {};

  const [currentStatus, setCurrentStatus] = useState(0);
  const [meetingRejected, setMeetingRejected] = useState(false);

  useEffect(() => {
    switch (item?.meetingStatus) {
      case "submitted":
        setCurrentStatus(1); // Under Review
        break;
      case "approved":
        setCurrentStatus(2); // Meeting Approved
        break;
      case "completed":
        setCurrentStatus(3); // Item Claimed
        break;
      default:
        setCurrentStatus(0); // Claim Submitted
    }

    if (item?.meetingStatus === "rejected") {
      setMeetingRejected(true);
    }
  }, [item]);

  const statusSteps = [
    { label: "Claim Submitted", completed: currentStatus >= 0 },
    { label: "Under Review", completed: currentStatus >= 1 },
    { label: "Request Meeting Approved", completed: currentStatus >= 2 },
    { label: "Item Claimed", completed: currentStatus >= 3 },
  ];

  return (
    <div className="min-h-screen bg-white p-6 pt-10">
      {/* Back Arrow and Title */}
      <div className="flex items-center mb-6">
        <img
          src={BackArrowIcon}
          alt="Back"
          className="w-6 h-6 cursor-pointer mr-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        />
        <h1 className="text-2xl font-bold">Claim Status</h1>
      </div>

      {/* Progress Bar */}
      <div className="relative flex items-start justify-between mb-8">
        {statusSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-1/4 relative"
          >
            {/* Line connecting the icons */}
            {index !== 0 && (
              <div
                className={`absolute left-[-50%] top-4 h-1 w-full z-0 ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}

            {/* Icons */}
            <div className="relative z-10 w-8 h-8">
              {index === currentStatus + 1 && meetingRejected ? (
                <img src={RejectedStepIcon} alt="Rejected Step" />
              ) : step.completed ? (
                <img src={CompletedStepIcon} alt="Completed Step" />
              ) : (
                <div className="w-full h-full border-2 border-gray-400 rounded-full bg-white"></div>
              )}
            </div>

            {/* Text label */}
            <span className="text-sm mt-2">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Status Updates */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Claim Details</h2>
        <ul className="text-sm text-gray-600 space-y-4">
          <li>
            <span>
              Your claim has been submitted. Our team is reviewing it.
            </span>
            <span className="block text-xs text-gray-400">
              {item?.date}, {item?.time}
            </span>
          </li>
          <li>
            <span>
              Your claim is under review. We are verifying the details.
            </span>
            <span className="block text-xs text-gray-400">
              {item?.date}, {item?.time}
            </span>
          </li>
          {meetingRejected ? (
            <li>
              <span>Your meeting request was rejected.</span>
              <span className="block text-xs text-gray-400">
                {item?.date}, {item?.time}
              </span>
            </li>
          ) : (
            <li>
              <span>
                Request for meeting approval has been sent. Please wait for
                confirmation.
              </span>
              <span className="block text-xs text-gray-400">
                {item?.date}, {item?.time}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatusPage;
