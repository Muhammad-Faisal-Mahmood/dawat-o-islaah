import { useState, useEffect } from "react";
import apiClient from "../api/quranApi";

const useSurah = (surahNumber) => {
  const [surahDetails, setSurahDetails] = useState(null);
  const [translationOptions, setTranslationOptions] = useState({
    en: [],
    ur: [],
  });
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState({ en: {}, ur: {} });
  const [audioLinks, setAudioLinks] = useState([]);
  const [selectedTranslations, setSelectedTranslations] = useState({
    en: ["en.sahih"], // Default English translations
    ur: ["ur.junagarhi"], // Default Urdu translations
  });
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingVerses, setLoadingVerses] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Surah Details & Available Translations Once
  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        const arabicResponse = await apiClient.get(`/surah/${surahNumber}`);
        const enResponse = await apiClient.get("/edition/language/en");
        const urResponse = await apiClient.get("/edition/language/ur");

        setSurahDetails(arabicResponse.data.data);
        setTranslationOptions({
          en: enResponse.data.data.filter(
            (edition) => edition.format === "text"
          ),
          ur: urResponse.data.data.filter(
            (edition) => edition.format === "text"
          ),
        });
      } catch (err) {
        console.error("Failed to fetch Surah details:", err);
        setError("Failed to fetch Surah details");
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchSurahDetails();
  }, [surahNumber]); // Only runs once when component mounts

  // Fetch Selected Translations Dynamically
  useEffect(() => {
    const fetchVerses = async () => {
      setLoadingVerses(true);
      try {
        let englishTranslations = {};
        let urduTranslations = {};
        let audioData = [];

        // Fetch English Translations
        for (const identifier of selectedTranslations.en) {
          const response = await apiClient.get(
            `/surah/${surahNumber}/${identifier}`
          );
          englishTranslations[identifier] = response.data.data.ayahs;
        }

        // Fetch Urdu Translations
        for (const identifier of selectedTranslations.ur) {
          const response = await apiClient.get(
            `/surah/${surahNumber}/${identifier}`
          );
          urduTranslations[identifier] = response.data.data.ayahs;
        }

        // Fetch Audio (Only Once)
        if (audioLinks.length === 0) {
          const audioResponse = await apiClient.get(
            `/surah/${surahNumber}/ar.alafasy`
          );
          audioData = audioResponse.data.data.ayahs.map((ayah) => ayah.audio);
        }

        setVerses(surahDetails.ayahs); // Preserve original Arabic text
        setTranslations({ en: englishTranslations, ur: urduTranslations });
        if (audioData.length > 0) setAudioLinks(audioData);
      } catch (err) {
        setError("Failed to fetch translations");
      } finally {
        setLoadingVerses(false);
      }
    };

    if (surahDetails) fetchVerses();
  }, [selectedTranslations, surahDetails]); // Only runs when translations change

  return {
    surahDetails,
    translationOptions,
    verses,
    translations,
    audioLinks,
    selectedTranslations,
    setSelectedTranslations,
    loadingDetails,
    loadingVerses,
    error,
  };
};

export default useSurah;
