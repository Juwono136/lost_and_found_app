import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import Lost from "../../Lost";

const AdminLayout = () => {
  const [isAdminView, setIsAdminView] = useState(true);

  const toggleView = () => {
    setIsAdminView((prevView) => !prevView);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {isAdminView && <Sidebar />}

      {/* Main Content */}
      <div className="flex-grow">
        {/* Header */}
        <Header isAdminView={isAdminView} toggleView={toggleView} />

        <div className="p-6">
          {isAdminView ? (
            <Outlet /> // Render nested routes for admin views
          ) : (
            <Lost /> // Render the Lost & Found view component
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
