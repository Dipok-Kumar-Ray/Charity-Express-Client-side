import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

const axiosSecure= axios.create({
  baseURL: "https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app", // তোমার backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});


const useAxiosSecure = () => {
  // const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //  Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //  Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthorized - redirecting to login");
          localStorage.removeItem("access-token");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    //  Cleanup interceptor
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
