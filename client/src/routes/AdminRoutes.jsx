import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../screens/admin/AdminLayout";
import AdminDashboard from "../screens/admin/AdminDashboard";
import MeetingRequests from "../screens/admin/MeetingRequests";
import Items from "../screens/admin/Items";
import ClaimsHistory from "../screens/admin/ClaimsHistory";
import MeetingsHistory from "../screens/admin/MeetingsHistory";
import AdminLogin from "../screens/admin/AdminLogin";
import AdminEditProfile from "../screens/admin/AdminEditProfile";
import ManageUsers from "../screens/admin/ManageUsers";
import ViewLog from "../screens/admin/ViewLog";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="meeting-requests" element={<MeetingRequests />} />
        <Route path="items" element={<Items />} />
        <Route path="claims-history" element={<ClaimsHistory />} />
        <Route path="meetings-history" element={<MeetingsHistory />} />
        <Route path="profile" element={<AdminEditProfile />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="view-log" element={<ViewLog />} />
      </Route>

      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoutes;
