import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../service/AuthContext";
import { getAccessToken } from "../service/axios"; // Import the function to get access token

const PrivateRoute = () => {
    const { loading } = useAuth(); // Get loading state from context
    const accessToken = getAccessToken(); // Get access token from axiosInstance

    // Show loading state while the access token is being refreshed
    if (loading) return <div>Loading...</div>
    else{
      if (!accessToken) return <Navigate to="/login" />;

    }

    // If there is no access token, redirect to login
   

    // If access token exists, render the Outlet (child routes)
    return <Outlet />;
};

export default PrivateRoute;
