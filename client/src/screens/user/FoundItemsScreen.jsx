import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";
import axiosInstance from "../../service/axios"; // Import axios instance
import userApi from "../../service/UserService";

const FoundItemsScreen = () => {
  const navigate = useNavigate();
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);



  // Fetch found items for the current user
  const fetchFoundItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      const user = await userApi.get("/user_infor");
      const fetchedItems = response.data.items
        .filter((item) => item.founded_by === user.data._id) // Filter items founded by the logged-in user
        .map((item) => ({
          id: item.id,
          title: item.name,
          description: item.item_desc,
          location: `${item.campus}, ${item.found_at}`,
          date: new Date(item.date_reported).toLocaleDateString(),
          time: new Date(item.date_reported).toLocaleTimeString(),
          category: item.category,
          status: item.status.toLowerCase(),
        }));
      setFoundItems(fetchedItems);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch found items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoundItems(); // Fetch the found items when the component loads
  }, []);

  const handleVerification = (id) => {
    console.log(`Item with id ${id} verified!`);
    // Logic to update item status can go here (e.g., PUT request to update the status)
  };

  if (loading) {
    return <p>Loading found items...</p>;
  }

  return (
    <div className="p-6">
      {/* Back Arrow and Title */}
      <div className="flex items-center mb-6">
        <img
          src={BackArrowIcon}
          alt="Back"
          className="w-6 h-6 cursor-pointer mr-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        />
        <h1 className="text-2xl font-bold">Found Items</h1>
      </div>

      {/* Found Items List */}
      <div className="space-y-4">
        {foundItems.length > 0 ? (
          foundItems.map((item) => (
            <ItemsCardComponent
              key={item.id}
              item={item}
              showClaimButton={false}
              onClick={() => handleVerification(item.id)}
              buttonLabel={
                item.status === "waiting for approval" ? "Verify" : ""
              }
            />
          ))
        ) : (
          <p>No found items to display.</p>
        )}
      </div>
    </div>
  );
};

export default FoundItemsScreen;
