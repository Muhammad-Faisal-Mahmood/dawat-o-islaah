import { StrictMode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import { LanguageProvider } from "../context/LanguageContext";

export default function Router() {
  const [isValidAuth] = useState(true);

  return (
    <StrictMode>
      <BrowserRouter>
        <LanguageProvider>
          {isValidAuth ? <AppRouter /> : <AuthRouter />}
        </LanguageProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
