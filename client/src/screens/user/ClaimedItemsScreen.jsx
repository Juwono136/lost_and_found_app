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

  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const meetingsResponse = await axiosInstance.get(
          `/meeting/meetings/${userId}`
        );
        const meetings = meetingsResponse.data.meetings;

        const itemPromises = meetings.map((meeting) =>
          axiosInstance.get(`/items/${meeting.item_id}`)
        );
        const itemResponses = await Promise.all(itemPromises);

        const formattedData = meetings.map((meeting, index) => {
          const item = itemResponses[index].data;

          return {
            id: meeting.item_id,
            title: item.name,
            description: item.item_desc,
            location: `${item.campus}, ${item.found_at}`,
            date: new Date(item.date_reported).toLocaleDateString(),
            time: new Date(item.date_reported).toLocaleTimeString(),
            category: item.category,
            status: meeting.status,
            foundedBy: item.founded_by,
            receivedBy: item.PIC,
          };
        });

        setClaimedItems(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching claimed items:", error);
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, [userId]);

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
