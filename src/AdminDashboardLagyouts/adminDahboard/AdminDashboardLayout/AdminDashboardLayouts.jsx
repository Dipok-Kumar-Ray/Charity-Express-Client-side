// src/layouts/AdminDashboardLayout.jsx
import { NavLink, Outlet } from "react-router";
import {
  FaUserShield,
  FaUsers,
  FaGift,
  FaTasks,
  FaClipboardCheck,
  FaStar,
  FaBars,
} from "react-icons/fa";
import CharityLogo from "../../../Shared/CharityLogo";

const AdminDashboardLayouts = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Bar (only for mobile) */}
        <div className="w-full flex items-center justify-between p-4 bg-base-200 lg:hidden">
          <CharityLogo />
          <label htmlFor="dashboard-drawer" className="btn btn-ghost">
            <FaBars size={20} />
          </label>
        </div>

        {/* Main Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-4">
          {/* Logo Section (desktop only) */}
          <div className="hidden lg:flex justify-center mb-6">
            <CharityLogo />
          </div>

          {/* Admin Profile */}
          <li>
            <NavLink
              to="/admin-dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaUserShield /> Admin Profile
            </NavLink>
          </li>

          {/* Manage Donations */}
          <li>
            <NavLink
              to="/admin-dashboard/manage-donations"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaGift /> Manage Donations
            </NavLink>
          </li>

          {/* Manage Users */}
          <li>
            <NavLink
              to="/admin-dashboard/manage-users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </li>

          {/* Manage Role Requests */}
          <li>
            <NavLink
              to="/admin-dashboard/manage-role-requests"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaClipboardCheck /> Manage Role Requests
            </NavLink>
          </li>

          {/* Manage Requests */}
          <li>
            <NavLink
              to="/admin-dashboard/manage-requests"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaTasks /> Manage Requests
            </NavLink>
          </li>

          {/* Feature Donations */}
          <li>
            <NavLink
              to="/admin-dashboard/feature-donations"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${
                  isActive ? "bg-blue-600 text-white font-semibold" : ""
                }`
              }
            >
              <FaStar /> Feature Donations
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardLayouts;
