import axios from "axios";
export const baseURL = process.env.REACT_APP_PUBLIC_BASE_URL;
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
