import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";
import axiosInstance from "../../service/axios";

const ClaimedItemsScreen = () => {
  const navigate = useNavigate();

  const [claimedItems, setClaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  // Dummy data for claimed items
  // const claimedItems = [
  //   {
  //     id: 1,
  //     title: "iPhone",
  //     description: "Black, 128GB, New Condition",
  //     location: "Lobby",
  //     date: "2023-12-12",
  //     time: "10:00 AM",
  //     category: "Tech",
  //     status: "claimed",
  //   },
  //   {
  //     id: 2,
  //     title: "MacBook Pro",
  //     description: "Silver, 256GB, Like New",
  //     location: "Library",
  //     date: "2023-12-10",
  //     time: "2:00 PM",
  //     category: "Tech",
  //     status: "claimed",
  //   },
  //   // Add more claimed items as needed
  // ];

  const fetchClaimedItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      const fetchedItems = response.data.items
        .filter((item) => item.claimed_by === userId) // Filter items claimed by the logged-in user
        .map((item) => ({
          id: item.id,
          title: item.name,
          description: item.item_desc,
          location: `${item.campus}, ${item.found_at}`,
          date: new Date(item.claim_date).toLocaleDateString(),
          time: new Date(item.claim_date).toLocaleTimeString(),
          category: item.category,
          status: item.status.toLowerCase(),
        }));
      setClaimedItems(fetchedItems);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch claimed items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaimedItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              showDetailButton={true}
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
