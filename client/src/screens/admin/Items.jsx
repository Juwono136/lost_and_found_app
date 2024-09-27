import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axios";
import DetailModal from "../../components/admin/DetailModal";
import AddEditModal from "../../components/admin/AddEditModal";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import { LuListFilter } from "react-icons/lu";
import { FiEdit, FiTrash } from "react-icons/fi";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await axiosInstance.get("/items/");
        setItems(
          itemResponse.data.items.filter((item) => item.status !== "claimed")
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleEditClick = (item) => {
    setSelectedItem(item); // Set the item to be edited
    setIsEdit(true); // Enable edit mode
    setIsAddModalOpen(true); // Open modal for editing
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item); // Set item to delete
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/items/delete/${itemToDelete._id}`);
      setItems((prevItems) =>
        prevItems.filter((i) => i._id !== itemToDelete._id)
      ); // Remove item from the list
      setIsDeleteModalOpen(false); // Close modal
      setItemToDelete(null); // Reset item to delete
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div>Loading...</div>;

  const handleOpenAddModal = () => {
    setSelectedItem(null); // Clear selected item for new entry
    setIsEdit(false); // Disable edit mode
    setIsAddModalOpen(true); // Open modal for adding new item
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Close add/edit modal
  };

  return (
    <div className="h-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleOpenAddModal}
          >
            Add item
          </button>
          <button className="flex items-center border border-gray-300 bg-white text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100">
            <LuListFilter className="mr-3" />
            Filter
          </button>
          <button className="border border-gray-300 bg-white text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100">
            Download all
          </button>
        </div>
      </div>

      <div className="p-4 shadow-md rounded-lg w-full bg-white">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Found At</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Date Reported</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">PIC</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentItems.map((item, index) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                key={item._id}
                onClick={() => handleItemClick(item)} // Trigger drawer open on row click
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={item.item_img || "https://via.placeholder.com/40"}
                    alt="Item"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="py-3 px-6">{item.found_at}</td>
                <td className="py-3 px-6">
                  <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {new Date(item.date_reported).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      item.status === "waiting for approval"
                        ? "bg-yellow-200 text-yellow-600"
                        : item.status === "active"
                        ? "bg-green-200 text-green-600"
                        : item.status === "on hold"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-gray-200 text-gray-600" // for "claimed"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={item.PICimg || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>User {item.PIC}</span>
                </td>
                <td className="py-3 px-6 space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(item); // Trigger edit modal
                    }}
                  >
                    <FiEdit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(item); // Trigger delete confirmation
                    }}
                  >
                    <FiTrash className="h-4 w-4 text-red-500 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
      <AddEditModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        item={selectedItem}
        isEdit={isEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete this item? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonColor="bg-red-600"
      />
    </div>
  );
};

export default Items;
