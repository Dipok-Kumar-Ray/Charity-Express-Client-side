import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import CharityLogo from "./CharityLogo";

const Navbar = () => {
const {user, logOut} = useAuth();
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allDonation">All Donations</NavLink>
      </li>
      
        <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>      
      
      <li>
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div className=" navbar fixed top-0 z-50 bg-base-200 shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
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
          <CharityLogo/>
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
<div className="navbar-end">
  {user ? ( 
    <div className="flex items-center gap-2 ">
      <button onClick={handleSignOut} className="btn btn-accent">
        Log Out
      </button>
      <div className="tooltip tooltip-bottom" data-tip={user.displayName || "No Name"}>
        <img
          src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-primary"
        />
      </div>
    </div>
  ) : (
    <>
      <NavLink className="btn" to="/register">
        Register
      </NavLink>
      <NavLink className="btn" to="/login">
        Login
      </NavLink>
    </>
  )}
</div>

    </div>
  );
};

export default Navbar;
