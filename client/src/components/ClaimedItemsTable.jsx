import React from "react";

const ClaimedItemsTable = ({ claimedItems }) => {
  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 text-sm font-semibold">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Location Found</th>
            <th className="px-4 py-2">Date Reported</th>
            <th className="px-4 py-2">Date Claimed</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Published At</th>
          </tr>
        </thead>
        <tbody>
          {claimedItems.map((item) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.user_id}</td>
              <td className="px-4 py-2">{item.user_name}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.location_found}</td>
              <td className="px-4 py-2">{item.date_reported}</td>
              <td className="px-4 py-2">{item.date_claimed}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Claimed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2">{item.publishedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimedItemsTable;
