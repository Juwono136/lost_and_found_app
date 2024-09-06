import React from "react";
import CalendarIcon from "../assets/calendar-icon.svg";
import ClockIcon from "../assets/clock-icon.svg";
import LocationIcon from "../assets/location-icon.svg";

const CardComponent = ({ items }) => {
  return (
    <div className="overflow-x-auto flex space-x-4 pb-6 px-4 scrollbar-hide">
      {items.map((item, index) => (
        <div
          key={index}
          className="min-w-[189px] min-h-[178px] bg-white shadow-lg shadow-gray-400 rounded-lg p-4 flex flex-col justify-between"
        >
          {/* Title */}
          <h2 className="font-bold text-lg text-left truncate overflow-hidden max-h-[24px]">
            {item.title}
          </h2>

          {/* Description with Text Truncation */}
          <p className="text-xs text-left truncate overflow-hidden max-h-[36px]">
            {item.description}
          </p>

          {/* Location, Date, and Time */}
          <div className="text-xs text-gray-500 flex flex-col items-start space-y-1">
            <div className="flex items-center">
              <img src={LocationIcon} alt="Location" className="w-4 h-4 mr-1" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center">
              <img src={CalendarIcon} alt="Calendar" className="w-4 h-4 mr-1" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center">
              <img src={ClockIcon} alt="Clock" className="w-4 h-4 mr-1" />
              <span>{item.time}</span>
            </div>
          </div>

          {/* Category and Status Pills */}
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-[#F1EDED] text-xxs text-[#858585] rounded-full">
              {item.category}
            </div>
            <div
              className={`px-2 py-1 text-xxs flex items-center justify-center rounded-full border ${
                item.status === "waiting"
                  ? "border-blue-500 text-blue-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              {item.status === "waiting" ? "Waiting" : "Claimed"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
