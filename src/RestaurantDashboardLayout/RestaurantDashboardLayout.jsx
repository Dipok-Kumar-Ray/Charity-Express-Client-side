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
    <NavLink
      to="/restaurant-dashboard/restaurant-profile"
      className={({ isActive, isPending }) =>
        `flex items-center gap-2 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer transform
         ${
           isActive
             ? "bg-yellow-300 text-yellow-900 font-bold shadow-md scale-105"
             : "hover:bg-yellow-200 hover:text-yellow-900 hover:font-semibold hover:scale-105"
         }`
      }
    >
      <FaUserCircle /> Profile
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/restaurant-dashboard/addDonation"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer transform
         ${
           isActive
             ? "bg-yellow-300 text-yellow-900 font-bold shadow-md scale-105"
             : "hover:bg-yellow-200 hover:text-yellow-900 hover:font-semibold hover:scale-105"
         }`
      }
    >
      <FaPlus /> Add Donation
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/restaurant-dashboard/my-donations"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer transform
         ${
           isActive
             ? "bg-yellow-300 text-yellow-900 font-bold shadow-md scale-105"
             : "hover:bg-yellow-200 hover:text-yellow-900 hover:font-semibold hover:scale-105"
         }`
      }
    >
      <FaClipboardList /> My Donations
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/restaurant-dashboard/requested-donations"
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer transform
         ${
           isActive
             ? "bg-yellow-300 text-yellow-900 font-bold shadow-md scale-105"
             : "hover:bg-yellow-200 hover:text-yellow-900 hover:font-semibold hover:scale-105"
         }`
      }
    >
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
