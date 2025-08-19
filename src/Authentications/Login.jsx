import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import LoginAnination from "../../src/assets/TemanASN Home Mobile.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  if(loading){
    return <span className="loading loading-bars loading-xl"></span>
  }


const onSubmit = async (data) => {
  try {
    const result = await signIn(data.email, data.password);
    const user = result.user;

    // Profile reload to get updated displayName/photo
    const auth = getAuth();
    await auth.currentUser.reload();

    const token = await user.getIdToken();
    localStorage.setItem("access-token", token);

    navigate(from);
  }
   catch (error) {
  console.error("Login Error:", error.code, error.message);

  if (error.code === "auth/user-not-found") {
    toast.error("No user found with this email!");
  } else if (error.code === "auth/wrong-password") {
    toast.error("Incorrect password!");
  } else if (error.code === "auth/invalid-email") {
    toast.error("Invalid email format!");
  } else {
    toast.error("Login failed. Try again!");
  }
}

};


 /*  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
       
        user.getIdToken().then((token) => {
          localStorage.setItem("access-token", token);
          navigate(from);
          // navigate('/');
        });
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };
 */
  return (
    <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 lg:px-16 py-10 gap-10">
      <div className="flex card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
       <h2 className="text-3xl text-center font-bold py-3">Please Login</h2>
        <form className="px-7" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email : </label>
            <input
  type="email"
  {...register("email", { required: true })}
  className="input"
  placeholder="Email"
/>
{errors.email && <p className="text-red-500">Email is required</p>}


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
          
          <p className="mx-2 py-3 text-center ">
            New to this site? Please
            <Link className="text-blue-500 underline" to='/register'>
            Register
            </Link>

          </p>
          <GoogleLogin from ={from} />
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
