import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import userApi, { getAllUser } from "../../service/UserService";
import { convertFileToBase64 } from "../../service/convetToBase64";
import debounce from "lodash.debounce";
import axiosInstance from "../../service/axios";

const AddEditModal = ({ isOpen, onClose, item, isEdit, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    item_img: null,
    item_desc: "",
    campus: "",
    found_at: "",
    storing_location: "",
    PIC: userId || 1,
    founded_by: "",
  });

  const [emailSearch, setEmailSearch] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [founderExists, setFounderExists] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUser();
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else if (userData && Array.isArray(userData.users)) {
          setUsers(userData.users);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        item_img: item.item_img || null,
        item_desc: item.item_desc || "",
        campus: item.campus || "",
        found_at: item.found_at || "",
        storing_location: item.storing_location || "",
        PIC: userId || 1,
        founded_by: item.founded_by || 1,
      });
    }
  }, [item, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await convertFileToBase64(file);
        setFormData({ ...formData, item_img: base64Image });
      } catch (error) {
        console.error("Error converting image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      category: formData.category,
      item_img: formData.item_img || "",
      item_desc: formData.item_desc || "",
      campus: formData.campus,
      found_at: formData.found_at,
      storing_location: formData.storing_location || "",
      PIC: formData.PIC,
      founded_by: formData.founded_by ? formData.founded_by : null,
    };

    try {
      if (isEdit) {
        await axiosInstance.put(`/items/update/${item._id}`, payload, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await axiosInstance.post("/items/new", payload, {
          headers: { "Content-Type": "application/json" },
        });
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  // Debounced function to filter email suggestions
  const debouncedEmailSearch = debounce((searchTerm) => {
    if (searchTerm.length > 1) {
      const filteredSuggestions = users.filter((user) =>
        user.personal_info.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setEmailSuggestions(filteredSuggestions);
      setFounderExists(filteredSuggestions.length > 0); // Set founderExists based on email presence
    } else {
      setEmailSuggestions([]);
      setFounderExists(false); // Reset when search is cleared
    }
  }, 300);

  const handleEmailSearch = (e) => {
    const { value } = e.target;
    setEmailSearch(value);
    debouncedEmailSearch(value);
    setRegistrationEmail(value); // Set email for registration if not found
  };

  // Handle selecting an email from suggestions
  const handleEmailSelect = (email, id) => {
    setFormData({ ...formData, founded_by: id });
    setEmailSearch(email);
    setEmailSuggestions([]);
    setFounderExists(true); // Set founderExists to true on selection
  };

  // Handle sending a registration link if email not found
  const handleSendRegistrationLink = async () => {
    try {
      await userApi.post("/user/send-registration-link", {
        email: registrationEmail,
      });
      alert(`Registration link sent to ${registrationEmail}`);
    } catch (error) {
      console.error("Error sending registration link:", error);
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
            <div className="relative border-dashed border-2 border-gray-400 h-24 w-24 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
              {formData.item_img && (
                <img
                  src={formData.item_img}
                  alt="Uploaded Item"
                  className="object-cover w-full h-full rounded-md"
                />
              )}
              <input
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
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
                name="item_desc"
                value={formData.item_desc}
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
                <option value="FX Sudirman (Senayan)">
                  FX Sudirman (Senayan)
                </option>
                <option value="JWC (Senayan)">JWC (Senayan)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600">Found At</label>
              <input
                type="text"
                name="found_at"
                value={formData.found_at}
                onChange={handleChange}
                placeholder="Enter where it was found"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600">Storing Location</label>
              <input
                type="text"
                name="storing_location"
                value={formData.storing_location}
                onChange={handleChange}
                placeholder="Enter storage location"
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Email Search Input */}
            <div className="relative">
              <label className="block text-gray-600">Founder Email</label>
              <input
                type="text"
                value={emailSearch}
                onChange={handleEmailSearch}
                placeholder="Search for founder's email"
                className="border p-2 rounded w-full"
              />

              {emailSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto">
                  {emailSuggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        handleEmailSelect(
                          suggestion.personal_info.email,
                          suggestion._id
                        )
                      }
                    >
                      {suggestion.personal_info.email}
                    </li>
                  ))}
                </ul>
              )}

              {/* Show button to send registration link only when email is not found */}
              {!founderExists && emailSearch.length > 0 && (
                <div className="mt-2">
                  <p className="text-red-500">Founder not found.</p>
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                    onClick={handleSendRegistrationLink}
                  >
                    Send Registration Link
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-600">Founder ID</label>
              <input
                type="text"
                name="founded_by"
                value={formData.founded_by}
                onChange={handleChange}
                placeholder="Founder ID"
                className="border p-2 rounded w-full"
                readOnly
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
