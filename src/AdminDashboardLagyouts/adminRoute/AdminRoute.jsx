// import { Navigate, useLocation } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useRole from "../hooks/useRole/useRole";

import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../RestaurantDashboardLayout/hooks/useRole/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;








// import { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useUserRole = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const { data: role = "user", isLoading } = useQuery({
//     queryKey: ["user-role", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
//       return res.data.role;
//     },
//   });

//   return [role, isLoading];
// };

// export default useUserRole;
