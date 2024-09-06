import React from "react";
import FlyingManIllustration from "../assets/flying-man-illus.png"; // Replace with the correct path to your image

const OnboardingScreen = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-between min-h-screen bg-white">
      {/* Illustration */}
      <div className="flex flex-1 justify-center items-center w-full">
        <img
          src={FlyingManIllustration}
          alt="Flying Man"
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold mb-4  text-left">
          The Bridge Between Lost and Found
        </h1>
      </div>

      {/* Buttons */}
      <div className="w-full px-6">
        <button className="w-full py-3 bg-blue-500 text-white rounded-full mb-4 text-lg font-semibold">
          Login
        </button>
        <button className="w-full py-3 border-2 border-blue-500 text-blue-500 rounded-full text-lg font-semibold">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
