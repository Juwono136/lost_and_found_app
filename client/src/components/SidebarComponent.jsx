import React from "react";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin/history" className="text-white hover:underline">
            Claimed Items History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarComponent;
