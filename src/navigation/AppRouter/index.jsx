import { Route, Routes } from "react-router-dom";
import Layout from "./Outlet";
import Home from "../../pages/home";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
