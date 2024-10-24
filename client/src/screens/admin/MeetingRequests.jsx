import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axios";
import DetailModal from "../../components/admin/DetailModal";
import { LuListFilter } from "react-icons/lu";
import Alert from "../../components/common/Alert";

const MeetingRequests = () => {
  const [meetings, setMeetings] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingResponse = await axiosInstance.get("/meeting/");
        const itemResponse = await axiosInstance.get("/items/");
        setMeetings(meetingResponse.data.meetings);
        setItems(itemResponse.data.items);
        setLoading(false);
      } catch (error) {
        setAlertType("error");
        setAlertMessage(
          "Error fetching data from the server. Please try again."
        );
        setShowAlert(true);
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const aggregateData = () => {
    return meetings
      .filter(
        (meeting) =>
          meeting.status !== "completed" && meeting.status !== "rejected"
      )
      .sort((a, b) => new Date(b.meeting_date) - new Date(a.meeting_date))
      .map((meeting) => {
        const item = items.find((item) => item._id === meeting.item_id);
        return {
          ...meeting,
          itemName: item?.name || "Unknown Item",
          itemImg: item?.item_img,
        };
      });
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

  const handleMeetingClick = (meeting) => {
    const item = items.find((item) => item._id === meeting.item_id);
    setSelectedMeeting(meeting);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  const handleAction = async (action, meetingId) => {
    try {
      if (action === "approve") {
        await axiosInstance.put(`/meeting/approve/${meetingId}`);
        setAlertType("success");
        setAlertMessage("Meeting approved successfully!");
      } else if (action === "reject") {
        await axiosInstance.put(`/meeting/reject/${meetingId}`);
        setAlertType("success");
        setAlertMessage("Meeting rejected successfully!");
      } else if (action === "complete") {
        await axiosInstance.put(`/meeting/complete/${meetingId}`);
        setAlertType("success");
        setAlertMessage("Meeting marked as completed!");
      } else if (action === "incomplete") {
        await axiosInstance.put(`/meeting/incomplete/${meetingId}`);
        setAlertType("success");
        setAlertMessage("Meeting marked as incomplete.");
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      const meetingResponse = await axiosInstance.get("/meeting/");
      setMeetings(meetingResponse.data.meetings);
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Error performing the action. Please try again.");
      setShowAlert(true);
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Meeting Requests</h2>
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

      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Meeting Date</th>
              <th className="py-3 px-6 text-left">Meeting Location</th>
              <th className="py-3 px-6 text-left">Item Name</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
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
                <td className="py-3 px-6 flex space-x-2">
                  {meeting.status === "submitted" && (
                    <>
                      <button
                        className="text-green-600 underline hover:text-green-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("approve", meeting._id);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600 underline hover:text-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("reject", meeting._id);
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {meeting.status === "approved" && (
                    <>
                      <button
                        className="text-green-600 underline hover:text-green-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("complete", meeting._id);
                        }}
                      >
                        Complete
                      </button>
                      <button
                        className="text-red-600 underline hover:text-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("incomplete", meeting._id);
                        }}
                      >
                        Incomplete
                      </button>
                    </>
                  )}
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
        meeting={selectedMeeting}
        item={selectedItem}
      />

      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default MeetingRequests;
