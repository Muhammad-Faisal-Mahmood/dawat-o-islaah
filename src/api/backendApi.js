import axios from "axios";

const BACKEND_BASE_URL = "https://dawatoislaah.com/api/";
// const BACKEND_BASE_URL = "http://127.0.0.1:8000/api/";

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

// Utility function to handle GET requests with query params
const getWithParams = (endpoint, params = {}) => {
  return backendApiClient.get(endpoint, { params }).then((res) => res.data);
};

export { backendApiClient, setAuthToken, BACKEND_BASE_URL, getWithParams };
