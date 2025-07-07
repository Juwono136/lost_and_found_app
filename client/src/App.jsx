import React from 'react'
import { Routes, Route } from 'react-router-dom'

import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import AuthProvider from './service/AuthContext'
import PrivateRoute from './routes/privateroute'
import LoginScreen from './screens/user/LoginScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import SelectRoleScreen from './screens/user/SelectRoleScreen'
import ForgotPassword from './screens/user/ForgotPassword'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/select-role" element={<SelectRoleScreen />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route element={<PrivateRoute />}>
          {/* user */}
          <Route path="/*" element={<UserRoutes />} />
          {/* admin */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
