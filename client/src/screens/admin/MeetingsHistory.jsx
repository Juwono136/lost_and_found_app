import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axios";
import Modal from "../../components/admin/DetailModal";
import { LuListFilter } from "react-icons/lu";

const MeetingsHistory = () => {
  const [meetings, setMeetings] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch meetings and items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingResponse = await axiosInstance.get("/meeting/");
        const itemResponse = await axiosInstance.get("/items/");
        setMeetings(
          meetingResponse.data.meetings.filter(
            (meeting) =>
              meeting.status === "completed" || meeting.status === "rejected"
          )
        );
        setItems(itemResponse.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const aggregateData = () => {
    return meetings.map((meeting) => {
      const item = items.find((item) => item._id === meeting.item_id);
      return {
        ...meeting,
        itemName: item?.name || "Unknown Item",
        itemImg: item?.item_img,
      };
    });
  };

  const handleMeetingClick = (meeting) => {
    const item = items.find((item) => item._id === meeting.item_id);
    setSelectedMeeting(meeting);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const currentMeetings = aggregateData().slice(
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
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Meetings History</h2>
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
              <th className="py-3 px-6 text-left">Meeting Date</th>
              <th className="py-3 px-6 text-left">Meeting Location</th>
              <th className="py-3 px-6 text-left">Item Name</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {currentMeetings.map((meeting, index) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={meeting._id}
                onClick={() => handleMeetingClick(meeting)}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  {new Date(meeting.meeting_date).toLocaleString()}
                </td>
                <td className="py-3 px-6">{meeting.location}</td>
                <td className="py-3 px-6">{meeting.itemName}</td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={meeting.itemImg || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>User {meeting.user_id}</span>
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      meeting.status === "completed"
                        ? "bg-green-200 text-green-600"
                        : meeting.status === "approved"
                        ? "bg-yellow-200 text-yellow-600"
                        : meeting.status === "rejected"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {meeting.status}
                  </span>
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        meeting={selectedMeeting}
        item={selectedItem}
      />
    </div>
  );
};

export default MeetingsHistory;
