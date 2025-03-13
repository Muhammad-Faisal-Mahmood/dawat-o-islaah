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
  const [fullSurahAudio, setFullSurahAudio] = useState(null);
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

  // Fetch Selected Translations & Audio
  useEffect(() => {
    const fetchVersesAndAudio = async () => {
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

        // Fetch Ayah-wise Audio
        const audioResponse = await apiClient.get(
          `/surah/${surahNumber}/ar.alafasy`
        );
        audioData = audioResponse.data.data.ayahs.map((ayah) => ayah.audio);

        // Fetch Full Surah Audio
        const fullSurahResponse = await apiClient.get(
          `/surah/${surahNumber}/ar.alafasy`
        );
        // console.log("fullSurahResponse", fullSurahResponse);

        const fullAudioLink = fullSurahResponse.data.data.ayahs;

        setVerses(surahDetails.ayahs); // Preserve original Arabic text
        setTranslations({ en: englishTranslations, ur: urduTranslations });
        setAudioLinks(audioData);
        setFullSurahAudio(fullAudioLink);
      } catch (err) {
        console.error("Failed to fetch translations/audio:", err);
        setError("Failed to fetch translations/audio");
      } finally {
        setLoadingVerses(false);
      }
    };

    if (surahDetails) fetchVersesAndAudio();
  }, [selectedTranslations, surahDetails]); // Only runs when translations change

  return {
    surahDetails,
    translationOptions,
    verses,
    translations,
    audioLinks,
    fullSurahAudio,
    selectedTranslations,
    setSelectedTranslations,
    loadingDetails,
    loadingVerses,
    error,
  };
};

export default useSurah;
