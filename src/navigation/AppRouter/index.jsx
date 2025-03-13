import { Route, Routes } from "react-router-dom";
import Layout from "./Outlet";
import Home from "../../pages/home";
import Quran from "../../pages/quran";
import Surah from "../../pages/quran/surah";
import Juz from "../../pages/quran/juz";
import Hadith from "../../pages/hadith";
import HadithBookChapters from "../../pages/hadith/HadithBookChapters";
import HadithList from "../../pages/hadith/HadithList";
import { ScrollToTopWrapper } from "../../utils/ScrollToTop";
export default function AppRouter() {
  return (
    <ScrollToTopWrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="alQuran" element={<Quran />} />
          <Route path="surah/:surahNumber" element={<Surah />} />
          <Route path="juz/:juzNumber" element={<Juz />} />
          <Route path="alHadith" element={<Hadith />} />
          <Route path="alHadith/:bookSlug" element={<HadithBookChapters />} />
          <Route
            path="alHadith/:bookSlug/:chapterNo"
            element={<HadithList />}
          />
        </Route>
      </Routes>
    </ScrollToTopWrapper>
  );
}
