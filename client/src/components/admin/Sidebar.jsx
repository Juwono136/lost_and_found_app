import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaBox,
  FaHistory,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserFriends,
  FaBookOpen,
} from "react-icons/fa";
import AppLogo from "../../assets/app-logo.png";
import { useAuth } from "../../service/AuthContext";

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <aside className="w-64 bg-white text-black flex-shrink-0 h-screen shadow-lg">
      <div className="p-4 flex items-center">
        <img src={AppLogo} alt="Company Logo" className="w-44" />
        {/* <span className="text-lg font-semibold">Lost and Found Dashboard</span>{" "} */}
      </div>

      <div className="p-4">
        <p className="text-gray-500 uppercase tracking-wider mb-4 text-sm">
          Overview
        </p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaHome className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/meeting-requests"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaClipboardList className="mr-3" />
              Meeting Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/items"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaBox className="mr-3" />
              Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/claims-history"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaHistory className="mr-3" />
              Claims History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/meetings-history"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaCalendarAlt className="mr-3" />
              Meetings History
            </NavLink>
          </li>

          <>
            <li>
              <NavLink
                to="/admin/manage-users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                    : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
                }
              >
                <FaUserFriends className="mr-3" />
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/view-log"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                    : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
                }
              >
                <FaBookOpen className="mr-3" />
                View Log
              </NavLink>
            </li>
          </>
        </ul>

        {/* Profile Section Title */}
        <p className="text-gray-500 uppercase tracking-wider mt-8 mb-4 text-sm">
          Account
        </p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center"
              }
            >
              <FaUser className="mr-3" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 p-3 block rounded-lg flex items-center"
                  : "p-3 block hover:bg-gray-100 rounded-lg flex items-center text-red-500"
              }
            >
              <FaSignOutAlt className="mr-3" />
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
