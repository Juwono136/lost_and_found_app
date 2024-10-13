import React, { useState } from "react";
import { Header } from "../../components/Header";
import CardComponent from "../../components/user/CardComponent";
import AllItemsFound from "../../components/ItemCardList";

const LostMainScreen = ({ items, mostRecentItems, userId, onSearchFocus }) => {
  const handleSearchFocus = () => {
    onSearchFocus();
  };

  return (
    <div
      className={"bg-[#4880EE] min-h-screen flex flex-col transition-opacity"}
    >
      {/* Header with greeting and search bar */}
      <Header userName="John" onSearchFocus={handleSearchFocus} />

      {/* Main content */}
      <div className="bg-[#F8F8F8] px-4 py-6 flex-grow">
        {/* Most Recent Section */}
        <h2 className="text-xl font-bold pb-4">Most Recent</h2>
        <div className="-mx-4">
          <CardComponent items={mostRecentItems} />
        </div>

        {/* All Items Found Section */}
        <h2 className="text-xl font-bold pb-4">All Items Found</h2>
        <AllItemsFound items={items} userId={userId} />
      </div>
    </div>
  );
};

export default LostMainScreen;
