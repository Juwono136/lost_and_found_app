import React, { useState } from "react";
import LostMainScreen from "./screens/user/LostItemScreen";
import SearchScreen from "./screens/user/SearchScreen";

import NavigationBar from "./components/NavigationBar";

export default function Lost() {
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const items = [
    {
      title: "iPhone",
      description: "Black, 128GB, New Condition",
      location: "alam-sutera",
      date: "12 Dec 2023",
      time: "10:00 AM",
      category: "Tech",
      status: "waiting",
      receivedBy: "Samsudin",
    },
    {
      title: "MacBook Pro",
      description: "Silver, 256GB, Excellent Condition",
      location: "senayan",
      date: "10 Dec 2023",
      time: "2:00 PM",
      category: "Tech",
      status: "claimed",
      receivedBy: "Cahya",
    },
    {
      title: "Samsung Galaxy",
      description: "Blue, 64GB, Like New",
      location: "senayan",
      date: "8 Dec 2023",
      time: "4:00 PM",
      category: "Tech",
      status: "waiting",
      receivedBy: "Samsudin",
    },
    {
      title: "Pixel",
      description: "Black, used Condition",
      location: "kemanggisan",
      date: "6 Dec 2023",
      time: "9:00 AM",
      category: "Tech",
      status: "waiting",
      receivedBy: "Samsudin",
    },
    // Add more card data as needed
  ];

  const mostRecentItems = items.slice(0, 3);

  const addRecentSearch = (searchTerm) => {
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches]);
    }
  };

  const handleDeleteSearch = (index) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  return (
    <div>
      {!isSearching ? (
        <LostMainScreen
          items={items}
          mostRecentItems={mostRecentItems}
          onSearchFocus={() => setIsSearching(true)} // Function to switch to search screen
        />
      ) : (
        <SearchScreen
          items={items}
          recentSearches={recentSearches}
          onSearch={addRecentSearch}
          onDeleteSearch={handleDeleteSearch}
          onBack={() => setIsSearching(false)} // Function to switch back to main screen
        />
      )}
      {/* Bottom Navigation */}
      <NavigationBar activeTab="home" />
    </div>
  );
}
