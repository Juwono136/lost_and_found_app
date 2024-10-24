import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { getUserInfo } from "../../service/UserService";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
    program: "",
    role: "0",
    password: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setFormData(userData.personal_info);
        // console.log("User: ", userData);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile saved", formData);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <div className="relative">
            <img
              src={formData?.avatar || "https://via.placeholder.com/50x50"}
              alt="Profile Pic"
              className="w-28 h-28 rounded-full mx-auto"
            />
            <button
              className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-md"
              aria-label="Edit Profile Picture"
            >
              <FaEdit className="text-blue-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label htmlFor="address" className="block font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Contact Number */}
          <div className="col-span-2">
            <label htmlFor="contactNumber" className="block font-medium">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Program */}
          <div>
            <label htmlFor="city" className="block font-medium">
              Program
            </label>
            <input
              type="text"
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block font-medium">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="0">General</option>
              <option value="3">Staff</option>
              <option value="4">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div className="col-span-2">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
