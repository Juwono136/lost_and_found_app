import React, { useState } from "react";
import { Header } from "../../components/Header";
import CardComponent from "../../components/user/CardComponent";
import AllItemsFound from "../../components/ItemCardList";

const LostMainScreen = ({ items, mostRecentItems, userId, onSearchFocus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchFocus = () => {
    onSearchFocus();
  };

  const handleSearchChangeWeb = (term) => {
    setSearchTerm(term);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={"bg-[#4880EE] min-h-screen flex flex-col transition-opacity"}
    >
      <Header
        onSearchFocus={handleSearchFocus}
        onSearchChange={handleSearchChangeWeb}
      />

      {/* Main content */}
      <div className="bg-[#F8F8F8] px-4 py-6 flex-grow">
        <div className="md:hidden">
          <h2 className="text-xl font-bold pb-4">Most Recent</h2>
          <div className="-mx-4">
            <CardComponent items={mostRecentItems} />
          </div>
        </div>

        <h2 className="text-xl font-bold pb-4">All Items Found</h2>
        <AllItemsFound items={filteredItems} userId={userId} />
      </div>
    </div>
  );
};

export default LostMainScreen;
