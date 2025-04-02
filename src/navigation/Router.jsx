import { StrictMode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import { LanguageProvider } from "../context/LanguageContext";
import { BookProvider } from "../context/BookContext";

export default function Router() {
  const [isValidAuth] = useState(true);

  return (
    <StrictMode>
      <BrowserRouter>
        <LanguageProvider>
          <BookProvider>
            {isValidAuth ? <AppRouter /> : <AuthRouter />}
          </BookProvider>
        </LanguageProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
