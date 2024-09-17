import React from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";

const ClaimedItemsScreen = () => {
  const navigate = useNavigate();

  // Dummy data for claimed items
  const claimedItems = [
    {
      id: 1,
      title: "iPhone",
      description: "Black, 128GB, New Condition",
      location: "Lobby",
      date: "2023-12-12",
      time: "10:00 AM",
      category: "Tech",
      status: "claimed",
    },
    {
      id: 2,
      title: "MacBook Pro",
      description: "Silver, 256GB, Like New",
      location: "Library",
      date: "2023-12-10",
      time: "2:00 PM",
      category: "Tech",
      status: "claimed",
    },
    // Add more claimed items as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Arrow and Title */}
      <div className="flex items-center mb-6">
        <img
          src={BackArrowIcon}
          alt="Back"
          className="w-6 h-6 cursor-pointer mr-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        />
        <h1 className="text-2xl font-bold">Claimed Items</h1>
      </div>

      {/* Claimed Items */}
      <div className="grid grid-cols-1 gap-4">
        {claimedItems.length > 0 ? (
          claimedItems.map((item) => (
            <ItemsCardComponent
              key={item.id}
              item={item}
              showDetailButton={true} // Pass true to show the Detail button
            />
          ))
        ) : (
          <p className="text-gray-600">No claimed items found.</p>
        )}
      </div>
    </div>
  );
};

export default ClaimedItemsScreen;
