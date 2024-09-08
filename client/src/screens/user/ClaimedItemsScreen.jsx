import React from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";

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

  // Function to handle navigation to the status page for the claimed item
  const handleItemClick = (itemId) => {
    navigate(`/status/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Claimed Items</h1>

      {/* Claimed Items */}
      <div className="grid grid-cols-1 gap-4">
        {claimedItems.length > 0 ? (
          claimedItems.map((item) => (
            <ItemsCardComponent
              key={item.id}
              item={item}
              onClick={() => handleItemClick(item.id)}
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
