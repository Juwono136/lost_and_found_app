import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AuthProvider from "./service/AuthContext";
import PrivateRoute from "./routes/privateroute";
import LoginScreen from "./screens/user/LoginScreen";
import RegisterScreen from "./screens/user/RegisterScreen";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
         
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route element={<PrivateRoute />}>
           {/* Render user routes */}
            <Route path="/*" element={<UserRoutes />} />
            
            {/* Render admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          
          </Route>
        
        </Routes>
      </AuthProvider>
    
    </Router>
  );
}
