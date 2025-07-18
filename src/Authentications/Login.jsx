import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";

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
    <div>
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
            <p className="text-red-500">Password must be 6 characters or longer.</p>
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
      </form>
      <GoogleLogin />
    </div>
  );
};

export default Login;
