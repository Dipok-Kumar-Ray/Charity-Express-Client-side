// import axios from 'axios';


//     const axiosInstance = axios.create({
//         baseURL: `http://localhost:3000`
//     })

//     const useAxios = () => {

//         return axiosInstance;
//     }

// export default useAxios;


// src/hooks/useAxios.js
import axios from "axios";

// baseURL টা .env থেকে নেবে (ডেভেলপমেন্ট আর প্রোডাকশন দুই জায়গাতেই আলাদা রাখা যায়)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", 
  withCredentials: true, // cookies / auth token এর জন্য দরকার হতে পারে
});

// custom hook
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
