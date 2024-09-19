import React from "react";
import ItemCardComponent from "./ItemsCardComponent";

const AllItemsFound = ({ items, userId }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, index) => (
        <ItemCardComponent key={index} item={item} loggedInUserId={userId} />
      ))}
    </div>
  );
};

export default AllItemsFound;
