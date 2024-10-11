import React, { useState, useEffect } from "react";
import { getAllUser } from "../../service/UserService"; // Adjust import path as needed
import { FiEdit, FiTrash } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = await getAllUser();
        // console.log("Fetched User Data:", userData);
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else if (userData && Array.isArray(userData.users)) {
          setUsers(userData.users);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Manage Users</h2>
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

      <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Avatar</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Program</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {Array.isArray(users) ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {/* Avatar Column */}
                  <td className="py-3 px-6">
                    <img
                      src={user.personal_info.avatar}
                      alt={user.personal_info.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  {/* Name Column */}
                  <td className="py-3 px-6">{user.personal_info.name}</td>
                  {/* Program Column */}
                  <td className="py-3 px-6">{user.personal_info.program}</td>
                  {/* Phone Column */}
                  <td className="py-3 px-6">{user.personal_info.phone}</td>
                  {/* Role Column */}
                  <td className="py-3 px-6">
                    <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-xs">
                      {user.personal_info.role === 1
                        ? "User"
                        : user.personal_info.role === 2
                        ? "Admin"
                        : "Security"}
                    </span>
                  </td>
                  {/* Actions Column */}
                  <td className="py-3 px-6 space-x-4">
                    <button
                      onClick={() => console.log("Edit user:", user._id.$oid)}
                    >
                      <FiEdit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() => console.log("Delete user:", user._id.$oid)}
                    >
                      <FiTrash className="h-4 w-4 text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
