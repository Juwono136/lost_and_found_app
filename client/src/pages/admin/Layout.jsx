import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
// import Lost from "../../Lost";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

const Layout = () => {
  const [isAdminView, setIsAdminView] = useState(true);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 1160);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  

  const toggleView = () => {
    setIsAdminView((prevView) => !prevView);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 1160);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      {/* {isAdminView && <Sidebar />} */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>

      {/* Main Content */}
      <div className="flex flex-col flex-grow h-full overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        {/* <Header isAdminView={isAdminView} toggleView={toggleView} /> */}

        <div className="p-6 flex-grow overflow-y-auto p-4 min-h-0">
          {/* {isAdminView ? (
            <Outlet /> // Render nested routes for admin views
          ) : (
            <Lost /> // Render the Lost & Found view component
          )} */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
