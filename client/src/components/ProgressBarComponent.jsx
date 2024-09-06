import React from "react";
import CompletedStepIcon from "../assets/completed-step-icon.svg"; // Example icon

const ProgressBar = ({ currentStatus }) => {
  const statusSteps = [
    { label: "Claim Submitted", completed: currentStatus >= 0 },
    { label: "Under Review", completed: currentStatus >= 1 },
    { label: "Request Meeting Approved", completed: currentStatus >= 2 },
    { label: "Item Claimed", completed: currentStatus >= 3 },
  ];

  return (
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
            {step.completed ? (
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
  );
};

export default ProgressBar;
