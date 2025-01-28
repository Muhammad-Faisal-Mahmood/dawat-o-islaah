import { StrictMode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";

export default function Router() {
  const [isValidAuth] = useState(true);

  return (
    <StrictMode>
      <BrowserRouter>
        {isValidAuth ? <AppRouter /> : <AuthRouter />}
      </BrowserRouter>
    </StrictMode>
  );
}
