import axios from "axios";

const BASE_URL = "http://api.alquran.cloud/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
