import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/axios";
import {
  FaBox,
  FaCheckCircle,
  FaUsers,
  FaExclamationCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [data, setData] = useState({
    totalItems: 0,
    claimsProcessed: 0,
    totalMeetings: 0,
    unapprovedItems: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axiosInstance.get("/items/");
        const meetingsResponse = await axiosInstance.get("/meeting/");

        const totalItems = itemsResponse.data.items.length;

        const claimsProcessed = itemsResponse.data.items.filter(
          (item) => item.status === "claimed" || item.status === "on hold"
        ).length;

        const totalMeetings = meetingsResponse.data.meetings.length;

        const unapprovedItems = meetingsResponse.data.meetings.filter(
          (meeting) => meeting.status === "submitted"
        ).length;

        setData({
          totalItems,
          claimsProcessed,
          totalMeetings,
          unapprovedItems,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow mb-6 flex justify-between items-center relative overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Admin 👋</h1>
          <p className="text-gray-500 mt-2">
            Here's what's happening on your dashboard today. See the statistics
            at once.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Items Panel */}
        <div className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-blue-600 bg-blue-100 p-4 rounded-full mr-4">
              <FaBox size={32} /> {/* Icon with background */}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total Items</h2>
              <p className="text-2xl font-bold">{data.totalItems}</p>
            </div>
          </div>
        </div>

        {/* Claims Processed Panel */}
        <div className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-green-600 bg-green-100 p-4 rounded-full mr-4">
              <FaCheckCircle size={32} /> {/* Icon with background */}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Claims Processed
              </h2>
              <p className="text-2xl font-bold">{data.claimsProcessed}</p>
            </div>
          </div>
        </div>

        {/* Meeting Requests Panel */}
        <div className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-orange-600 bg-orange-100 p-4 rounded-full mr-4">
              <FaUsers size={32} /> {/* Icon with background */}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Meeting Requests
              </h2>
              <p className="text-2xl font-bold">{data.totalMeetings}</p>
            </div>
          </div>
        </div>

        {/* Unapproved Items Panel */}
        <div className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-red-600 bg-red-100 p-4 rounded-full mr-4">
              <FaExclamationCircle size={32} /> {/* Icon with background */}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Unapproved Items
              </h2>
              <p className="text-2xl font-bold">{data.unapprovedItems}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
