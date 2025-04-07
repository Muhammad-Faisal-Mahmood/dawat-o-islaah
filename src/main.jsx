import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./navigation/Router";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router />
  </AuthProvider>
);
