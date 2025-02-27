import { Route, Routes } from "react-router-dom";
import Layout from "./Outlet";
import Home from "../../pages/home";
import Quran from "../../pages/quran";
import Surah from "../../pages/surah";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="alQuran" element={<Quran />} />
        <Route path="surah/:surahNumber" element={<Surah />} />
      </Route>
    </Routes>
  );
}
