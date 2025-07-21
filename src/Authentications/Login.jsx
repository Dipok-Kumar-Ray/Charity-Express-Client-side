import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import LoginAnination from "../../src/assets/TemanASN Home Mobile.json";
import Lottie from "lottie-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //  accessToken নেওয়া ও localStorage-এ সেভ
        user.getIdToken().then((token) => {
          localStorage.setItem("access-token", token);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  return (
    <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 lg:px-16 py-10 gap-10">
      <div className="flex card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email : </label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />

            <label className="label">Password : </label>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer.
              </p>
            )}
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <GoogleLogin />
        </form>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie
          animationData={LoginAnination}
          loop={true}
          className="w-[250px] sm:w-[300px] md:w-[400px]"
        />
      </div>
    </div>
  );
};

export default Login;
