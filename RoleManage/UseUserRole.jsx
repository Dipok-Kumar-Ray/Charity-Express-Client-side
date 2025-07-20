import { useEffect, useState } from "react";
import useAxiosSecure from "../src/hooks/useAxiosSecure";
import useAuth from "../src/hooks/useAuth";

const UseUserRole = () => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const useAxios = useAxiosSecure();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchRole = async () => {
      if (loading || !user?.email) return;

      try {
        const res = await useAxios.get(`/users/role?email=${user.email}`);
        setRole(res.data.role || "");
      } catch (err) {
        console.error("Error fetching role:", err);
        setRole("");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user, loading, useAxios]);

  return { role, roleLoading };
};

export default UseUserRole;
