import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import Lottie from "lottie-react";
import LoginAnination from "../../src/assets/TemanASN Home Mobile.json";
import GoogleLogin from "./GoogleLogin";
import { getAuth } from "firebase/auth";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();

  // Loading delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const onSubmit = async (data) => {
    try {
      // 1. Create Firebase User
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2. Token Save
      const token = await user.getIdToken();
      localStorage.setItem("access-token", token);

      // 3. Profile Picture (use uploaded or default)
      const finalPhotoURL =
        profilePic ||
        data.photoURL ||
        "https://i.ibb.co/4pDNDk1/avatar-default.png";

      // 4. Send user info to backend
      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(),
        photoURL: finalPhotoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      // 5. Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: finalPhotoURL,
      });

      // 6. Reload current user to sync changes
      const auth = getAuth();
      await auth.currentUser.reload();

      // 7. Fallback check (if displayName still missing)
      if (!auth.currentUser.displayName) {
        await updateUserProfile({
          displayName: data.name,
          photoURL: finalPhotoURL,
        });
      }

      // 8. Success and redirect
      Swal.fire("Success", "Account created successfully", "success").then(() =>
        navigate(from)
      );
    } catch (error) {
      console.error("Firebase Error:", error.code, error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      Swal.fire("Error", "Image upload failed", error.message || error);
    }
  };

  return (
    <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 lg:px-16 py-10 gap-10">
      {/* Form Card */}
      <div className="flex card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-3 text-center">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
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

            {/* Profile Picture */}
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />

            {/* Email */}
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

            {/* Password */}
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

            {/* Submit */}
            <button className="btn btn-primary w-full mt-4">Register</button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>

          {/* Google Login */}
          <GoogleLogin from={from} />
        </div>
      </div>

      {/* Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={LoginAnination} loop className="w-[300px]" />
      </div>
    </div>
  );
};

export default Register;
