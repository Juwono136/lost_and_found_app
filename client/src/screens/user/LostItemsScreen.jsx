import React, { useState } from "react";
import { Header } from "../../components/HeaderComponent";
import CardComponent from "../../components/CardComponent";
import AllItemsFound from "../../components/ItemCardList";

const LostMainScreen = ({ items, mostRecentItems, onSearchFocus }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleSearchFocus = () => {
    setFadeOut(true);
    onSearchFocus();
  };

  return (
    <div
      className={`bg-[#4880EE] pb-16 min-h-screen flex flex-col transition-opacity ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Header with greeting and search bar */}
      <Header userName="John" onSearchFocus={handleSearchFocus} />

      {/* Main content */}
      <div className="bg-[#F8F8F8] rounded-lg mt-6 max-w-4xl px-4 py-6 flex-grow">
        {/* Most Recent Section */}
        <h2 className="text-xl font-bold pb-4">Most Recent</h2>
        <div className="-mx-4">
          <CardComponent items={mostRecentItems} />
        </div>

        {/* All Items Found Section */}
        <h2 className="text-xl font-bold pb-4">All Items Found</h2>
        <AllItemsFound items={items} />
      </div>
    </div>
  );
};

export default LostMainScreen;