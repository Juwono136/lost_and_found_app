import React from "react";
import ItemCardComponent from "./ItemCardComponent";

const AllItemsFound = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, index) => (
        <ItemCardComponent key={index} item={item} />
      ))}
    </div>
  );
};

export default AllItemsFound;
