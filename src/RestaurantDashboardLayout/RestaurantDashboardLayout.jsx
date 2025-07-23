import { NavLink, Outlet } from "react-router";
import { FaPlus, FaClipboardList, FaUserCircle, FaHandshake } from "react-icons/fa";
import CharityLogo from "../Shared/CharityLogo";


const RestaurantDashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-900 text-white p-6">
          <CharityLogo/>
        <h2 className="mt-5 text-2xl font-bold mb-8">Restaurant Panel</h2>
        <ul className="space-y-4 text-lg">
          <li>
            <NavLink to="/restaurant-dashboard/restaurant-profile" className="flex items-center gap-2 hover:text-yellow-300">
              <FaUserCircle /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurant-dashboard/addDonation" className="flex items-center gap-2 hover:text-yellow-300">
              <FaPlus /> Add Donation
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurant-dashboard/my-donations" className="flex items-center gap-2 hover:text-yellow-300">
              <FaClipboardList /> My Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurant-dashboard/requested-donations" className="flex items-center gap-2 hover:text-yellow-300">
              <FaHandshake /> Requested Donations
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
};

export default RestaurantDashboardLayout;
