import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // যদি from না থাকে, default "/" নাও
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      // 1️⃣ Google sign in
      const result = await signInWithGoogle();
      const user = result.user;

      // 2️⃣ Prepare user info
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      console.log("Sending user info:", userInfo);

      // 3️⃣ Try to save user to backend, but error হলে ignore করো
      try {
        await axiosInstance.post("/users", userInfo);
        console.log("User saved to backend");
      } catch (backendError) {
        console.warn("Backend save failed, continue anyway:", backendError.response?.data || backendError.message);
      }

      // 4️⃣ Success alert
      Swal.fire({
        icon: "success",
        title: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });

      // 5️⃣ Redirect user
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Google login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full mt-2"
    >
      Login with Google
    </button>
  );
};

export default GoogleLogin;
