import React from "react";
import { IoClose } from "react-icons/io5";

const DetailModal = ({ isOpen, onClose, meeting, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl shadow-lg">
        <div className="flex justify-between mb-4 border-b">
          <h2 className="text-xl font-semibold ">
            {meeting ? "Meeting & Item Details" : "Item Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            <IoClose className="h-8 w-8" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Conditionally render Meeting Details if meeting prop exists */}
          {meeting && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Meeting Details</h3>
              <table className="text-left">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Date
                    </td>
                    <td className="py-3">
                      {new Date(meeting?.meeting_date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Meeting ID
                    </td>
                    <td className="py-3">{meeting?._id}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Location
                    </td>
                    <td className="py-3">{meeting?.location}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Status
                    </td>
                    <td className="py-3">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          meeting.status === "completed"
                            ? "bg-green-200 text-green-600"
                            : meeting.status === "approved"
                            ? "bg-yellow-200 text-yellow-600"
                            : meeting.status === "rejected"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-red-200 text-red-600" // for "submitted"
                        }`}
                      >
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Item Details */}
          <div className="flex">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-4">Item Details</h3>
              <table className="text-left">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Item Name
                    </td>
                    <td className="py-3">{item?.name}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Category
                    </td>
                    <td className="py-3">{item?.category}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Found At
                    </td>
                    <td className="py-3">{item?.found_at}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Campus
                    </td>
                    <td className="py-3">{item?.campus}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Storing Location
                    </td>
                    <td className="py-3">{item?.storing_location}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Date Reported
                    </td>
                    <td className="py-3">
                      {new Date(item?.date_reported).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-semibold py-3 pr-8">
                      Status
                    </td>
                    <td className="py-3">
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
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Item Image - Centered Vertically */}
            <div className="flex-shrink-0 ml-8 flex items-center">
              {item?.item_img ? (
                <img
                  src={item.item_img}
                  alt={item.name}
                  className="w-32 h-32 rounded"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
