import axios from "axios"


const axiosInstance = axios.create({
    baseURL: "http://localhost:4700",
    withCredentials: true,
})

export default axiosInstance;