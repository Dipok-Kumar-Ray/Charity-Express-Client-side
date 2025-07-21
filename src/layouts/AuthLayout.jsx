import { Outlet } from "react-router";
import CharityLogo from "../Shared/CharityLogo";


const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200 ">
      <CharityLogo/>
      <Outlet/>
    </div>
  );
};

export default AuthLayout;
