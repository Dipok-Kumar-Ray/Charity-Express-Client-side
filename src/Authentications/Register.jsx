import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import Lottie from "lottie-react";
import LoginAnination from "../../src/assets/TemanASN Home Mobile.json";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      // create user in Firebase Auth
      const result = await createUser(data.email, data.password);

      // save user info in your backend
      const userInfo = {
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      // update Firebase user profile
      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };
      await updateUserProfile(userProfile);

      Swal.fire("Success", "Account created successfully", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      Swal.fire("Error", "Image upload failed", error);
    }
  };

  return (
    <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 lg:px-16 py-10 gap-10">
      <div className="flex card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-3">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Your Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <label>Profile Picture</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />

            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (value.length < 6)
                    return "Password must be at least 6 characters";
                  if (!/[A-Z]/.test(value))
                    return "Password must include a capital letter";
                  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value))
                    return "Password must include a special character";
                  return true;
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button className="btn btn-primary w-full mt-4">Register</button>
          </form>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={LoginAnination} loop className="w-[300px]" />
      </div>
    </div>
  );
};

export default Register;
