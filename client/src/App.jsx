import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Render user routes */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Render admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}
