import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Lost from '../Lost'
import SearchScreen from '../screens/user/SearchScreen'
import ProfilePage from '../screens/user/ProfilePage'
import NotificationPage from '../screens/user/NotificationPage'
import StatusPage from '../screens/user/StatusPage'
import FoundItemsScreen from '../screens/user/FoundItemsScreen'
import ClaimedItemsScreen from '../screens/user/ClaimedItemsScreen'
import EditProfile from '../screens/user/EditProfile'
import SelectRoleScreen from '../screens/user/SelectRoleScreen'

export default function UserRoutes() {
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
      <Route path="/select-role" element={<SelectRoleScreen />} />
    </Routes>
  )
}
