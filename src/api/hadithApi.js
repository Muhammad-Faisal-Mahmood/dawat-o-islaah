import axios from "axios";

const BASE_URL = "https://hadithapi.com/api/";
const API_KEY = "$2y$10$d4nL2E660zHHBrwTB7Bviu3WvW5sToLRBWFbJ1yhn7rJzSuNpA0S";

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
