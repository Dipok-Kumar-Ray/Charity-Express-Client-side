import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        Swal.fire("Success", "Logged in with Google", "success");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="btn btn-outline mt-4 w-full"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
