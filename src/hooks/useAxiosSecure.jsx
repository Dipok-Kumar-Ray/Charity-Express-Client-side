import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor); // cleanup interceptor
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;





// import axios from "axios";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: `http://localhost:3000`
// });

// const useAxiosSecure = () => {
//   const { user } = useAuth();

//   axiosSecure.interceptors.request.use(
//     config => {
//       config.headers.Authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

//   return axiosSecure; //  returning axios instance directly
// };

// export default useAxiosSecure;
