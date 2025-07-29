// AdminProfile.jsx
import { useContext } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useContext(AuthContext); // Firebase থেকে current user
  const axiosSecure = useAxiosSecure();

  // Database থেকে role আনছি (name/email Firebase থেকে আসবে)
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner text-primary"></span>;

  return (
    <div className="max-w-md mx-auto bg-base-200 p-6 rounded-xl shadow-lg mt-8 text-center">
      {/* Photo - Firebase থেকে */}
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
          <img
            src={user?.photoURL || "https://i.ibb.co/tYTCvYt/default-user.png"}
            alt="Profile"
          />
        </div>
      </div>

      {/* Name - Firebase থেকে */}
      <h2 className="text-2xl font-bold text-primary mb-2">
        {user?.displayName || "Anonymous"}
      </h2>

      {/* Email - Firebase থেকে */}
      <p>{user?.email}</p>

      {/* Role - Database থেকে */}
      {userInfo.role && (
        <div className="mt-3">
          <span className="badge badge-info capitalize">Role: {userInfo.role}</span>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
