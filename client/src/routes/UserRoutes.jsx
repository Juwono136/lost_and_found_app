import React from "react";
import { Route, Routes } from "react-router-dom";
import Lost from "../Lost";
import SearchScreen from "../screens/user/SearchScreen";
import ProfilePage from "../screens/user/ProfilePage";
import NotificationPage from "../screens/user/NotificationPage";
import StatusPage from "../screens/user/StatusPage";
import LoginScreen from "../screens/user/LoginScreen";
import RegisterScreen from "../screens/user/RegisterScreen";
import FoundItemsScreen from "../screens/user/FoundItemsScreen";
import ClaimedItemsScreen from "../screens/user/ClaimedItemsScreen";
import EditProfile from "../screens/user/EditProfile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Lost />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/status/*" element={<StatusPage />} />
      <Route path="/found-items" element={<FoundItemsScreen />} />
      <Route path="/claimed-items" element={<ClaimedItemsScreen />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
};

export default UserRoutes;
