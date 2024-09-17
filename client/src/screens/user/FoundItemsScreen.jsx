import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsCardComponent from "../../components/ItemsCardComponent";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";

const FoundItemsScreen = () => {
  const navigate = useNavigate();

  const dummyItems = [
    {
      id: 1,
      title: "Wallet",
      description: "Brown leather wallet",
      location: "Library",
      date: "12 Dec 2023",
      time: "2:00 PM",
      category: "Accessories",
      status: "waiting for approval",
    },
    {
      id: 2,
      title: "Watch",
      description: "Silver wristwatch, brand Omega",
      location: "Cafeteria",
      date: "10 Dec 2023",
      time: "12:00 PM",
      category: "Jewelry",
      status: "active",
    },
  ];

  const handleVerification = (id) => {
    console.log(`Item with id ${id} verified!`);
    // Logic to update item status can go here.
  };

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

      <div className="space-y-4">
        {dummyItems.map((item) => (
          <ItemsCardComponent
            key={item.id}
            item={item}
            onClick={() => handleVerification(item.id)}
            buttonLabel={item.status === "waiting for approval" ? "Verify" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default FoundItemsScreen;
