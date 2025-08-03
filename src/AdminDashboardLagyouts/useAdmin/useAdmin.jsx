import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/admin?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setIsAdmin(data.isAdmin);
          setAdminLoading(false);
        })
        .catch(() => {
          setIsAdmin(false);
          setAdminLoading(false);
        });
    } else {
      setIsAdmin(false);
      setAdminLoading(false);
    }
  }, [user]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
