import { Route, Routes } from "react-router-dom";
import Layout from "./Outlet";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>App Router</div>} />
      </Route>
    </Routes>
  );
}
