import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import ProfilePicPlaceholder from "../../assets/default-profile.png"; // Placeholder for profile picture
import { getUserInfo } from "../../service/UserService";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Function to handle logout
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  // Function to handle navigating to the Claimed Items Screen
  const handleViewClaimedItems = () => {
    navigate("/claimed-items"); // Redirect to the claimed items page
  };

  // Function to handle navigating to the Found Items Screen
  const handleFoundItems = () => {
    navigate("/found-items"); // Redirect to the FoundItemsScreen
  };


   // Fetch user info when the component mounts
   useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(); // Fetch user info
        setUserInfo(data); // Set the user info in state
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserInfo();
  }, []);





  return (
    <div className="min-h-screen bg-white">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center py-6">Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center mt-6">
        <img
          src={ProfilePicPlaceholder}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
      </div>

      {/* Profile Information */}
      <div className="mt-6 px-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Name</h2>
          <p className="text-gray-600">{userInfo?.personal_info?.name || "N/A"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-600">{userInfo?.personal_info?.email || "N/A"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 px-6">
        {/* Edit Profile Button */}
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4">
          Edit Profile
        </button>

        {/* View Claimed Items Button */}
        <button
          onClick={handleViewClaimedItems}
          className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg mb-4"
        >
          View Claimed Items
        </button>

        {/* View Found Items Button */}
        <button
          onClick={handleFoundItems}
          className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg mb-4"
        >
          View Found Items
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg mb-4"
        >
          Logout
        </button>
      </div>

      {/* Bottom Navigation */}
      <NavigationBar activeTab="profile" />
    </div>
  );
};

export default ProfilePage;
