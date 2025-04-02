import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8000/api/";

const backendApiClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set Authorization token dynamically
const setAuthToken = (token) => {
  if (token) {
    backendApiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete backendApiClient.defaults.headers["Authorization"];
  }
};

export { backendApiClient, setAuthToken, BACKEND_BASE_URL };
