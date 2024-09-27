import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axios";
import DetailModal from "../../components/admin/DetailModal";
import { LuListFilter } from "react-icons/lu";

const ClaimsHistory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await axiosInstance.get("/items/");
        setItems(
          itemResponse.data.items.filter((item) => item.status === "claimed")
        ); // Filter only claimed items
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

  return (
    <div className="bg-gray-100">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Claims History</h2>
        <div className="flex space-x-4">
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
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Claimed Date</th>
              <th className="py-3 px-6 text-left">Claimed By</th>
              <th className="py-3 px-6 text-left">PIC</th>
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
                <td className="py-3 px-6">
                  <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {new Date(item.claim_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={"https://via.placeholder.com/40"} // Placeholder image for claimed by user
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>User {item.claimed_by}</span>
                </td>
                <td className="py-3 px-6">{item.PIC}</td>
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
    </div>
  );
};

export default ClaimsHistory;
