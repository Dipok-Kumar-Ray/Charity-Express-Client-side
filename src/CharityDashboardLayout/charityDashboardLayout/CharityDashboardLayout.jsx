import {
  FaUser,
  FaClipboardList,
  FaTruck,
  FaGift,
  FaHistory,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import CharityLogo from "../../Shared/CharityLogo";

const CharityDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle */}
      <input id="charity-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar (mobile) */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="charity-drawer"
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
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-lg">
            Charity Dashboard
          </div>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="charity-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Logo */}
          <CharityLogo />

          <ul className="space-y-4 p-4 text-lg">
            <li>
              <NavLink
                to="/charity-dashboard/charity-profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-green-300 ${
                    isActive ? "bg-green-300 font-bold" : ""
                  }`
                }
              >
                <FaUser /> Charity Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/charity-dashboard/my-requests"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-green-300 ${
                    isActive ? "bg-green-300 font-bold" : ""
                  }`
                }
              >
                <FaClipboardList /> My Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/charity-dashboard/my-pickups"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-green-300 ${
                    isActive ? "bg-green-300 font-bold" : ""
                  }`
                }
              >
                <FaTruck /> My Pickups
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/charity-dashboard/received-donations"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-green-300 ${
                    isActive ? "bg-green-300 font-bold" : ""
                  }`
                }
              >
                <FaGift /> Received Donations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/charity-dashboard/transaction-history"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-green-300 ${
                    isActive ? "bg-green-300 font-bold" : ""
                  }`
                }
              >
                <FaHistory /> Transaction History
              </NavLink>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default CharityDashboardLayout;
