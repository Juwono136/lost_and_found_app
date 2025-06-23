import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Notification from "./pages/admin/Notification";
import Item from "./pages/admin/Item";
import AddItem from "./pages/admin/AddItem";
import EditItem from "./pages/admin/EditItem";
import Meetings from "./pages/admin/Meetings";
import Profile from "./pages/admin/Profile";
// import AdminAddMeeting from "../pages/admin/AdminAddMeeting";
// import AdminEditMeeting from "../pages/admin/AdminEditMeeting";
// import AdminProfile from "../pages/admin/AdminProfile";
// import AdminEditProfile from "../pages/admin/AdminEditProfile"


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="notification" element={<Notification />} />
        <Route path="items" element={<Item />} />        
        <Route path="items/add" element={<AddItem />} />
        <Route path="items/edit" element={<EditItem />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="profile" element={<Profile />} />

        {/* <Route path="meeting-requests" element={<MeetingRequests />} />

        <Route path="meetings/add" element={<AdminAddMeeting />} />
        <Route path="meetings/edit" element={<AdminEditMeeting />} />
        <Route path="profile" element={<AdminProfile/>}/>
        <Route path="profile/edit" element={<AdminEditProfile/>}/> */}
      </Route>

      {/* <Route path="/login" element={<AdminLogin />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
