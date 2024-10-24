import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackArrowIcon from "../../assets/back-arrow-icon.svg";
import SearchIcon from "../../assets/search-blue-icon.svg";
import FilterIcon from "../../assets/filter-blue-icon.svg";
import ClearIcon from "../../assets/clear-blue-icon.svg";
import ClockIcon from "../../assets/clock-icon.svg";
import ItemCardComponent from "../../components/ItemsCardComponent";
import FilterModal from "../../components/user/FilterModal"; // Import the FilterModal component

const SearchScreen = ({
  items,
  userId,
  recentSearches,
  onSearch,
  onDeleteSearch,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for FilterModal visibility
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowBackArrow(true), 100);
  }, []);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSearchSelect = (search) => {
    onSearch(search);
    setSearchTerm(search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleOpenFilter = () => {
    setIsFilterVisible(true); // Show the FilterModal
  };

  const handleCloseFilter = () => {
    setIsFilterVisible(false); // Close the FilterModal
  };

  const handleApplyFilter = (filterData) => {
    console.log("Filters applied:", filterData);
    // Apply your filtering logic here
    setIsFilterVisible(false); // Close the FilterModal after applying filters
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-5 bg-[#F8F8F8] min-h-screen">
      <div className="flex items-center pt-8 mb-4">
        <img
          src={BackArrowIcon}
          alt="Back"
          className={`w-5 h-5 text-blue-500 cursor-pointer mr-2 transition-transform duration-300 ${
            showBackArrow
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
          onClick={onBack}
        />

        {/* Search bar */}
        <div className="flex items-center w-full bg-white border border-blue-500 rounded-full px-4 py-3">
          <img
            src={SearchIcon}
            alt="Search"
            className="w-6 h-6 text-blue-500 mr-2"
          />
          <input
            type="text"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full outline-none"
          />
          {searchTerm && (
            <img
              src={ClearIcon}
              alt="Clear"
              className="w-4 h-4 text-blue-500 cursor-pointer mr-3"
              onClick={handleClearSearch}
            />
          )}
          <img
            src={FilterIcon}
            alt="Filter"
            className="w-5 h-5 text-blue-500 cursor-pointer"
            onClick={handleOpenFilter} // Open the FilterModal on click
          />
        </div>
      </div>

      {searchTerm === "" ? (
        <div>
          <h3 className="font-bold text-lg mb-2">Recent Searches</h3>
          <ul>
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-600 mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={ClockIcon}
                    alt="Clock"
                    className="w-4 h-4 text-blue-500 mr-2"
                  />
                  <span>{search}</span>
                </div>
                <img
                  src={ClearIcon}
                  alt="Delete"
                  className="w-4 h-4 text-blue-500 cursor-pointer"
                  onClick={() => onDeleteSearch(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-lg mb-2">Search Results</h3>
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item, index) => (
              <ItemCardComponent
                key={index}
                item={item}
                loggedInUserId={userId}
                onClick={() => handleSearchSelect(item.title)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
      />
    </div>
  );
};

export default SearchScreen;
