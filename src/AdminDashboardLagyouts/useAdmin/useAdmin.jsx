import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/users/admin?email=${user.email}`)
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
