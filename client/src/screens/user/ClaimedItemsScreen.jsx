import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";
import axiosInstance from "../../service/axios";

const ClaimedItemsScreen = () => {
  const navigate = useNavigate();

  const [claimedItems, setClaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Simulating logged-in user

  const fetchClaimedItems = async () => {
    try {
      const response = await axiosInstance.get(`/meeting/meetings/${userId}`);
      const fetchedItems = response.data.meetings.map((meeting) => ({
        id: meeting._id,
        title: meeting.item.name,
        description: meeting.item.item_desc,
        location: `${meeting.item.campus}, ${meeting.item.found_at}`,
        date: new Date(meeting.meeting_date).toLocaleDateString(),
        time: new Date(meeting.meeting_date).toLocaleTimeString(),
        category: meeting.item.category,
        status: meeting.item.status.toLowerCase(),
        meetingStatus: meeting.status,
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
              loggedInUserId={userId}
              // onDetailClick={() => navigate("/status", { state: { item } })}
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
