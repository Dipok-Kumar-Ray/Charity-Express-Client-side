import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../hooks/useRole/useRole";

const RestaurantRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (user && role === "restauran || charity || admin") {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default RestaurantRoute;
