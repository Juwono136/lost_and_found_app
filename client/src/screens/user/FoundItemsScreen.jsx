import React, { useState } from "react";
import ItemsCardComponent from "../../components/ItemsCardComponent";

const FoundItemsScreen = () => {
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
      <h2 className="text-2xl font-bold mb-4">Found Items</h2>
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
