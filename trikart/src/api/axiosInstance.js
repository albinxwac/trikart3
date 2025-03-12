import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://uat.search-assist.webc.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
