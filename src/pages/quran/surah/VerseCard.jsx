import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { useLanguage } from "../../../context/LanguageContext";
import { parseTafseerText } from "../../../utils/parseTafseerText";
import { useParams } from "react-router-dom";

const ShimmerLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

const VerseCard = ({
  verses,
  translations,
  audioLinks,
  surahNo,
  isTranslation,
}) => {
  const { t } = useLanguage();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [selectedTafsir, setSelectedTafsir] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);
  const [tafsirError, setTafsirError] = useState(null);
  const { surahNumber } = useParams();

  // Function to handle audio playback
  const playAudio = (index) => {
    if (currentAudio) {
      currentAudio.pause();
      setPlayingIndex(null);
    }

    if (playingIndex !== index) {
      const newAudio = new Audio(audioLinks[index]);
      newAudio.play();
      setCurrentAudio(newAudio);
      setPlayingIndex(index);

      newAudio.onended = () => {
        setPlayingIndex(null);
      };
    }
  };

  // Function to disable/enable body scroll
  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // Prevent content shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  };

  // Function to show Tafsir in a modal with lazy loading
  const openTafsirModal = async (ayah) => {
    setShowModal(true);
    setIsLoadingTafsir(true);
    setTafsirError(null);
    setSelectedTafsir(null);
    toggleBodyScroll(true); // Disable body scroll

    try {
      // Lazy load the tafsir data
      const { default: tafsirData } = await import(
        `../../../../data/tafsir/${ayah?.surah?.number || surahNumber}.json`
      );

      const tafsirText = tafsirData?.tafsir[ayah.numberInSurah - 1]?.tafsir;

      if (tafsirText) {
        setSelectedTafsir(tafsirText);
      } else {
        setSelectedTafsir(t("quranDetails.tafsir") + " not available");
      }
    } catch (error) {
      console.error("Error loading tafsir:", error);
      setTafsirError("Failed to load tafsir. Please try again.");
    } finally {
      setIsLoadingTafsir(false);
    }
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTafsir(null);
    setTafsirError(null);
    setIsLoadingTafsir(false);
    toggleBodyScroll(false); // Re-enable body scroll
  };

  // Cleanup function to re-enable scroll when component unmounts
  useEffect(() => {
    return () => {
      toggleBodyScroll(false);
    };
  }, []);

  // React component to render Islamic text
  function IslamicTextRenderer({
    text,
    className = "text-gray-800 text-lg/9",
  }) {
    const parsedElements = parseTafseerText(text);
    return <p className={([className], "leading-10")}>{parsedElements}</p>;
  }

  return (
    <div className="space-y-6">
      {verses.map((ayah, index) => (
        <div
          key={ayah.number}
          className="bg-white shadow-lg rounded-lg p-6 md:px-8 relative border-2 border-neutral-200"
        >
          {/* Play/Pause Button */}
          <button
            onClick={() => playAudio(index)}
            className="absolute top-4 left-4 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition"
          >
            {playingIndex === index ? (
              <span className="flex gap-2 items-center">
                <FaPause className="text-lg" />
                <h3>{t("quranDetails.pauseVerse")}</h3>
              </span>
            ) : (
              <span className="flex gap-2 items-center">
                <FaPlay className="text-lg" />
                <h3>{t("quranDetails.playVerse")}</h3>
              </span>
            )}
          </button>

          <p className="absolute top-4 right-4 text-gray-500 text-base md:text-lg lg:text-xl">
            {surahNo}:{ayah.numberInSurah}
          </p>

          {/* Arabic Ayah (Always Centered) */}
          <p className="text-3xl md:text-4xl text-center mt-14 leading-relaxed font-quran">
            {ayah.text}
          </p>

          {/* Translations Grid */}
          <div className="grid md:grid-cols-2 md:gap-4 mt-6">
            {/* Left Column (English Translations) */}
            {isTranslation && (
              <>
                <div className="text-left">
                  {Object.entries(translations.en).map(
                    ([identifier, ayahList]) => (
                      <div key={identifier} className="mb-4">
                        <p className="text-gray-700 text-lg">
                          {ayahList[index]?.text || "Translation Not Available"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          - {identifier.replace("en.", "").toUpperCase()}{" "}
                          (English)
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Right Column (Urdu Translations) */}
                <div className="text-right">
                  {Object.entries(translations.ur).map(
                    ([identifier, ayahList]) => (
                      <div key={identifier} className="mb-4">
                        <p className="text-gray-700 text-lg/10 leading-10">
                          {ayahList[index]?.text || "ترجمہ دستیاب نہیں"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          - {identifier.replace("ur.", "").toUpperCase()} (Urdu)
                        </p>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* Tafsir Button */}
          <div className="flex justify-center">
            <button
              onClick={() => openTafsirModal(ayah)}
              disabled={isLoadingTafsir}
              className={`mt-2 flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg transition ${
                isLoadingTafsir
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E3A5F] hover:bg-blue-700"
              } text-white`}
            >
              <IoBookOutline className="text-white" size={24} />
              {isLoadingTafsir ? "Loading..." : t("quranDetails.checkTafsir")}
            </button>
          </div>
        </div>
      ))}

      {/* Tafsir Modal */}
      {showModal && (
        <div
          className="custom-backdrop fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-hidden relative border border-gray-300 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-red-600 hover:text-red-700 cursor-pointer transition z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-bold text-center mb-4 flex-shrink-0">
              {t("quranDetails.tafsir")}
            </h2>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto pr-2">
              {isLoadingTafsir ? (
                <ShimmerLoader />
              ) : tafsirError ? (
                <div className="text-center text-red-600 p-4">
                  <p className="text-lg">{tafsirError}</p>
                  <button
                    onClick={() => {
                      // Retry loading
                      const currentAyah = verses.find((v) => selectedTafsir); // You might need to store current ayah
                      if (currentAyah) {
                        openTafsirModal(currentAyah);
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Retry
                  </button>
                </div>
              ) : selectedTafsir ? (
                <IslamicTextRenderer
                  text={selectedTafsir}
                  className="text-gray-800 text-lg/9"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseCard;
