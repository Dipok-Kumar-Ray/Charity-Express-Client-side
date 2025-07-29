import { NavLink, Outlet } from "react-router";
import {
  FaUser,
  FaClipboardList,
  FaTruck,
  FaGift,
  FaHistory,
} from "react-icons/fa";

const CharityDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="w-full flex items-center justify-between bg-green-600 p-4 text-white lg:hidden">
          <h2 className="text-xl font-bold">Charity Dashboard</h2>
          <label htmlFor="dashboard-drawer" className="btn btn-ghost">
            ☰
          </label>
        </div>

        {/* Content render */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-64 space-y-2 p-4 text-lg">
          <SidebarLink
            to="/charity-dashboard/charity-profile"
            icon={<FaUser />}
            label="Charity Profile"
          />
          <SidebarLink
            to="/charity-dashboard/my-requests"
            icon={<FaClipboardList />}
            label="My Requests"
          />
          <SidebarLink
            to="/charity-dashboard/my-pickups"
            icon={<FaTruck />}
            label="My Pickups"
          />
          <SidebarLink
            to="/charity-dashboard/received-donations"
            icon={<FaGift />}
            label="Received Donations"
          />
          <SidebarLink
            to="/charity-dashboard/transaction-history"
            icon={<FaHistory />}
            label="Transaction History"
          />
        </ul>
      </div>
    </div>
  );
};

// Reusable NavLink component
const SidebarLink = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-md transition-colors duration-200
           hover:bg-green-200 hover:font-bold
           ${isActive ? "bg-green-300 font-bold" : ""}`
        }
      >
        {icon} <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default CharityDashboardLayout;
