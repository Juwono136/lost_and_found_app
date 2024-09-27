import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Edit icon from react-icons

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "Mehrab",
    lastName: "Bozorgi",
    email: "Mehrabbozorgi.business@gmail.com",
    address: "33062 Zboncak isle",
    contactNumber: "58677.79",
    city: "Mehrab",
    state: "Bozorgi",
    password: "sdbffbn65sfdvb s",
  });

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
              src="https://via.placeholder.com/150"
              alt="Profile"
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
              value={formData.firstName}
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
              value={formData.lastName}
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
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
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
