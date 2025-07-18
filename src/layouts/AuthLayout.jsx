import authImg from "../assets/authImg.webp";
import { Outlet } from "react-router";
import CharityLogo from "../Shared/CharityLogo";

const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200 ">
      <div>
        <CharityLogo/>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="flex-1">
                <img src={authImg} className="lg:h-120 max-w-sm rounded-lg shadow-2xl" />
      </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
