import React from "react";
import { useState } from "react";
import { useAuth } from "../../service/AuthContext";

import { useNavigate } from "react-router-dom";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, refreshAccessToken} = useAuth();
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
        const userData = { email: email, password: password };
        console.log("Logging in with", userData);

        const loginResponse = await login(userData); // Log in to set the refresh token
        if (loginResponse) { // Check if login is successful
          const token = await refreshAccessToken(); // Get the access token
          console.log("access:", token); // Store access token
          navigate("/home"); // Navigate to home page after successful login
        }

        // At this point, the access token should be set
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
};



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6">
      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">Log in</h1>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-4 flex items-center text-gray-500 focus:outline-none"
          >
            {/* Icon to show/hide password */}
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C6.313 2 2.773 4.108 1 7.515c1.773 3.407 5.313 5.515 9 5.515s7.227-2.108 9-5.515C17.227 4.108 13.687 2 10 2zM3.463 7.515A7.963 7.963 0 0110 4c2.347 0 4.483.944 6.075 2.515a7.963 7.963 0 01-6.075 3.485A7.963 7.963 0 013.463 7.515zM10 12a1.993 1.993 0 01-1.992-1.992A1.993 1.993 0 0110 8.015a1.993 1.993 0 011.992 1.992A1.993 1.993 0 0110 12z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M1 10s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8zm9-3a3 3 0 100 6 3 3 0 000-6zm-3.546 2.736A5 5 0 0010 12a5 5 0 003.546-6.264L6.454 9.736z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <a href="#" className="text-blue-500 text-sm font-semibold">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
