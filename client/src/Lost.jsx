import React, { useState, useEffect } from "react";
import LostMainScreen from "./screens/user/LostItemsScreen";
import SearchScreen from "./screens/user/SearchScreen";
import NavigationBar from "./components/NavigationBar";

import axiosInstance from "./service/axios";

export default function Lost() {
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // const items = [
  //   {
  //     title: "iPhone",
  //     description: "Black, 128GB, New Condition",
  //     location: "alam-sutera",
  //     date: "12 Dec 2023",
  //     time: "10:00 AM",
  //     category: "Tech",
  //     status: "waiting",
  //     receivedBy: "Samsudin",
  //   },
  //   {
  //     title: "MacBook Pro",
  //     description: "Silver, 256GB, Excellent Condition",
  //     location: "senayan",
  //     date: "10 Dec 2023",
  //     time: "2:00 PM",
  //     category: "Tech",
  //     status: "claimed",
  //     receivedBy: "Cahya",
  //   },
  //   {
  //     title: "Samsung Galaxy",
  //     description: "Blue, 64GB, Like New",
  //     location: "senayan",
  //     date: "8 Dec 2023",
  //     time: "4:00 PM",
  //     category: "Tech",
  //     status: "waiting",
  //     receivedBy: "Samsudin",
  //   },
  //   {
  //     title: "Pixel",
  //     description: "Black, used Condition",
  //     location: "kemanggisan",
  //     date: "6 Dec 2023",
  //     time: "9:00 AM",
  //     category: "Tech",
  //     status: "waiting",
  //     receivedBy: "Samsudin",
  //   },
  // ];

  const userId = 1; // Assume the logged-in user has an ID of 1

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      const fetchedItems = response.data.items
        .filter((item) => {
          // Show the item if:
          // - It is "active" or "claimed"
          // - OR it is "waiting for approval" AND the item was founded by the logged-in user
          return (
            item.status === "active" ||
            item.status === "claimed" ||
            (item.status === "waiting for approval" &&
              item.founded_by === userId)
          );
        })
        .map((item) => ({
          title: item.name,
          description: item.item_desc,
          location: `${item.campus}, ${item.found_at}`,
          date: new Date(item.date_reported).toLocaleDateString(),
          time: new Date(item.date_reported).toLocaleTimeString(),
          category: item.category,
          status: item.status.toLowerCase(),
          receivedBy: item.PIC,
        }));
      setItems(fetchedItems);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const mostRecentItems = items.slice(0, 3);

  const addRecentSearch = (searchTerm) => {
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches]);
    }
  };

  const handleDeleteSearch = (index) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

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
