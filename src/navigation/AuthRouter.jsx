import { Route, Routes } from "react-router-dom";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Auth Router</div>} />
    </Routes>
  );
}
