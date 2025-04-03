import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import { WithHeroLayout, WithoutHeroLayout } from "./Outlet";
import Quran from "../../pages/quran";
import Surah from "../../pages/quran/surah";
import Juz from "../../pages/quran/juz";
import Hadith from "../../pages/hadith";
import HadithBookChapters from "../../pages/hadith/HadithBookChapters";
import HadithList from "../../pages/hadith/HadithList";
import { ScrollToTopWrapper } from "../../utils/ScrollToTop";
import ZakatCalculator from "../../pages/IslamicTools/ZakatCalculator";
import InheritanceCalculator from "../../pages/IslamicTools/InheritanceCalculator";
import PrayerTimings from "../../pages/IslamicTools/PrayerTimings";
import QiblaDirection from "../../pages/IslamicTools/QiblaDirection";
import NearestMosquesMap from "../../pages/IslamicTools/NearestMosque";
import IslamicBooks from "../../pages/islamicBooks";
import Masail from "../../pages/masail";
import { BookProvider } from "../../context/BookContext";
import { MasailProvider } from "../../context/MasailContext";
export default function AppRouter() {
  return (
    <ScrollToTopWrapper>
      <Routes>
        <Route path="/" element={<WithHeroLayout />}>
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
      <BookProvider>
        <MasailProvider>
          <Routes>
            <Route path="/" element={<WithoutHeroLayout />}>
              <Route path="zakat-calculator" element={<ZakatCalculator />} />
              <Route
                path="inheritance-calculator"
                element={<InheritanceCalculator />}
              />
              <Route path="prayer-timings" element={<PrayerTimings />} />
              <Route path="qibla-direction" element={<QiblaDirection />} />
              <Route path="nearest-mosque" element={<NearestMosquesMap />} />
              <Route path="islamicBooks" element={<IslamicBooks />} />
              <Route path="masail" element={<Masail />} />
            </Route>
          </Routes>
        </MasailProvider>
      </BookProvider>
    </ScrollToTopWrapper>
  );
}
