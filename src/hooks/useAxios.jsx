import axios from 'axios';


    const axiosInstance = axios.create({
        baseURL: `https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app`
    })

    const useAxios = () => {

        return axiosInstance;
    }

export default useAxios;