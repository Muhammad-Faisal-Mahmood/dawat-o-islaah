import axios from "axios";

const BASE_URL = "https://hadithapi.com/api/";
const API_KEY = "$2y$10$rvAYOPkIf72h5qnTW2EmPszCh3XxLxzlPLK0m4odpU7NaS39F2e";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchHadith = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: {
        ...params,
        apiKey: API_KEY, // Ensure API key is always included
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Hadith:", error);
    throw error;
  }
};

export { fetchHadith };
export default apiClient;
