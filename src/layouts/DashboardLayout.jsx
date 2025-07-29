import {
  FaPlusCircle,
  FaUser,
  FaHandsHelping,
  FaHeart,
  FaStar,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import CharityLogo from "../Shared/CharityLogo";

// Reusable Sidebar Link Component
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

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden font-bold">Dashboard</div>
        </div>

        {/* Page Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <CharityLogo />

          <ul className="space-y-4 p-4 text-lg">
            <SidebarLink
              to="/dashboard/my-profile"
              icon={<FaUser />}
              label="My Profile"
            />
            <SidebarLink
              to="/dashboard/request-charity"
              icon={<FaHandsHelping />}
              label="Charity Request"
            />
            <SidebarLink
              to="/dashboard/favorites"
              icon={<FaHeart />}
              label="Favorites"
            />
            <SidebarLink
              to="/dashboard/my-reviews"
              icon={<FaStar />}
              label="My Reviews"
            />
            <SidebarLink
              to="/dashboard/transaction-history"
              icon={<FaMoneyCheckAlt />}
              label="Transaction History"
            />
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
