import { useState, useEffect } from "react";
import apiClient from "../api/quranApi";

const useSurah = (surahNumber) => {
  const [surah, setSurah] = useState(null);
  const [translations, setTranslations] = useState({ en: [], ur: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        // Fetch Arabic Surah Data
        const arabicResponse = await apiClient.get(`/surah/${surahNumber}`);
        const arabicData = arabicResponse.data.data;

        // Fetch English Translation
        const englishResponse = await apiClient.get(
          `/surah/${surahNumber}/en.asad`
        );
        const englishData = englishResponse.data.data.ayahs;

        // Fetch Urdu Translation
        const urduResponse = await apiClient.get(
          `/surah/${surahNumber}/ur.junagarhi`
        );
        const urduData = urduResponse.data.data.ayahs;

        setSurah(arabicData);
        setTranslations({ en: englishData, ur: urduData });
      } catch (err) {
        setError("Failed to fetch Surah data");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

  return { surah, translations, loading, error };
};

export default useSurah;
