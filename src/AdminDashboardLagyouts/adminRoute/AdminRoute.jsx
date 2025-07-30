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









