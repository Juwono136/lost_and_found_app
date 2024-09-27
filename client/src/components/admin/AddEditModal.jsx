import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../../service/axios";

const AddEditModal = ({ isOpen, onClose, item, isEdit, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Others",
    itemImg: null,
    itemDesc: "",
    campus: "",
    foundAt: "",
    storingLocation: "",
    PIC: userId || "",
    foundedBy: "",
  });

  const [founderEmail, setFounderEmail] = useState(""); // Track founder email input

  // useEffect to update formData when the selected item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "Others",
        itemImg: item.item_img || null,
        itemDesc: item.item_desc || "",
        campus: item.campus || "",
        foundAt: item.found_at || "",
        storingLocation: item.storing_location || "",
        PIC: userId || "",
        foundedBy: item.founded_by || "",
      });
      setFounderEmail(item.founderEmail || ""); // If you have an email field to be tracked
    }
  }, [item, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, itemImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      if (isEdit) {
        await axiosInstance.put(`/items/update/${item._id}`, formDataObj);
      } else {
        await axiosInstance.post("/items/new", formDataObj);
      }
      onClose(); // Close the modal after successful request
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            <IoClose className="h-8 w-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4 justify-center">
            {/* Image Upload Box */}
            <div className="relative border-dashed border-2 border-gray-400 h-24 w-24 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
              {formData.itemImg && (
                <img
                  src={URL.createObjectURL(formData.itemImg)}
                  alt="Uploaded Item"
                  className="object-cover w-full h-full rounded-md"
                />
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Text Next to Image Box */}
            <div className="text-sm text-gray-600">
              <span className="block text-gray-500">Drag image here</span>
              <span className="text-blue-600 cursor-pointer">
                or Browse image
              </span>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="Tech">Tech</option>
                <option value="Phone">Phone</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-600">Item Description</label>
              <input
                type="text"
                name="itemDesc"
                value={formData.itemDesc}
                onChange={handleChange}
                placeholder="Enter item description"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600">Campus</label>
              <select
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="Tech">FX Sudirman (Senayan)</option>
                <option value="Phone">JWC (Senayan)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Found At</label>
              <input
                type="text"
                name="foundAt"
                value={formData.foundAt}
                onChange={handleChange}
                placeholder="Enter where it was found"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600">Storing Location</label>
              <input
                type="text"
                name="storingLocation"
                value={formData.storingLocation}
                onChange={handleChange}
                placeholder="Enter storage location"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600">Founder Email</label>
              <input
                type="email"
                name="founderEmail"
                value={founderEmail}
                onChange={(e) => setFounderEmail(e.target.value)}
                placeholder="Enter founder email"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
