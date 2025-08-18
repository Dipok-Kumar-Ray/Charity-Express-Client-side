import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import CharityLogo from "./CharityLogo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
//  console.log("Navbar user:", user);  

 const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // role কে lowercase করে নেওয়া যাতে case mismatch না হয়
  const role = user?.role?.toLowerCase();

const navItems = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition duration-300 ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          }`
        }
      >
        Home
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/allDonation"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition duration-300 ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          }`
        }
      >
        All Donations
      </NavLink>
    </li>

    <ul>
      {role === "user" && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-white-700 text-bold hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            User Dashboard
          </NavLink>
        </li>
      )}

      {role === "restaurant" && (
        <li>
          <NavLink
            to="/restaurant-dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            Restaurant Dashboard
          </NavLink>
        </li>
      )}

      {role === "charity" && (
        <li>
          <NavLink
            to="/charity-dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            Charity Dashboard
          </NavLink>
        </li>
      )}

      {role === "admin" && (
        <li>
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </li>
      )}
    </ul>

    <li>
      <NavLink
        to="/aboutUs"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition duration-300 ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          }`
        }
      >
        About Us
      </NavLink>
    </li>
  </>
);

  return (
    <div className="navbar fixed top-0 z-50 bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>





        <button className="btn btn-ghost text-xl">
          <CharityLogo />
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

       {/* toggle theme  */}
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {/* {links} */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </ul>
      </div>


      <div className="navbar-end">
  {user ? (
    <div className="flex items-center gap-2">
      <button onClick={handleSignOut} className="rounded-4xl btn btn-accent">
        Log Out
      </button>

      {/* Profile with name */}
      <div className="flex items-center gap-2">
        <div
          className="tooltip tooltip-bottom"
          data-tip={user.displayName || "No Name"}
        >
          <img
            src={user?.photoURL || "/default.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-primary"
          />
        </div>
        {/* <p className="text-sm font-medium">
          {user?.displayName || "User"}
        </p> */}
      </div>
    </div>
  ) : (
    <>
      <NavLink className="btn btn-primary btn-sm" to="/login">
        Login
      </NavLink>
    </>
  )}
</div>

    </div>
  );
};

export default Navbar;
