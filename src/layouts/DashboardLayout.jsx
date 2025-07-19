import { FaBoxOpen, FaHistory, FaHome } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import CharityLogo from "../Shared/CharityLogo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
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
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet />
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <CharityLogo/>
         <ul className="space-y-4 p-4 text-lg">
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donations" className="flex items-center gap-2">
          <FaHome /> Add Donations
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-profile" className="flex items-center gap-2">
          <FaBoxOpen /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/request-charity" className="flex items-center gap-2">
          <FaBoxOpen /> Charity Request
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/favorites" className="flex items-center gap-2">
          <FaBoxOpen />Favorites
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-reviews" className="flex items-center gap-2">
          <FaBoxOpen /> My Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/transaction-history" className="flex items-center gap-2">
          <FaBoxOpen /> Transaction History
        </NavLink>
      </li>

    </ul>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
