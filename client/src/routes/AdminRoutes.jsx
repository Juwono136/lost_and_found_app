import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../screens/admin/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
