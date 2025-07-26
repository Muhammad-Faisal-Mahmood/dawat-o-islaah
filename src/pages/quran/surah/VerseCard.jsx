import { useState } from "react";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import tafsirData from "../../../../data/tafsir/tafsirByAyah.json"; // Import the Tafsir JSON
import { IoBookOutline } from "react-icons/io5";
import { useLanguage } from "../../../context/LanguageContext";

const ayahsPerSurah = [
  0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
  111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54,
  45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62,
  55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28,
  20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15,
  21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
];

// console.log("length of tafsir", tafsirData.ayat.length);

const getTafsirIndex = (surahNo, verseNo) => {
  if (surahNo <= 0 || surahNo >= ayahsPerSurah.length) return -1;
  const previousAyahCount = ayahsPerSurah
    .slice(0, surahNo)
    .reduce((acc, ayahs) => acc + ayahs, 0);
  return previousAyahCount + verseNo - 1; // Adjust for 0-based index
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
  const [selectedTafsir, setSelectedTafsir] = useState(null); // Store selected Tafsir
  const [showModal, setShowModal] = useState(false); // Modal state

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

  // Function to show Tafsir in a modal
  const openTafsirModal = (verseNo) => {
    const tafsirIndex = getTafsirIndex(surahNo, verseNo);
    setSelectedTafsir(
      tafsirData.ayat[tafsirIndex]?.ayat_text ||
        t("quranDetails.tafsir") + " not available"
    );
    setShowModal(true);
  };

  function parseIslamicTextToJSX(text) {
    // Split text by all bracket patterns while keeping the brackets
    const parts = text.split(
      /(\{[^}]*\}|\[[^\]]*\]|«[^»]*»|[➊➋➌➍➎➏➐➑➒➓⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿])/
    );

    return parts.map((part, index) => {
      // Check if this part matches any bracket pattern
      if (part.startsWith("«") && part.endsWith("»")) {
        return (
          <span key={index} className="text-red-600 font-quran text-2xl">
            {part}
          </span>
        );
      } else if (part.startsWith("{") && part.endsWith("}")) {
        // Quran verse - remove brackets and apply green + font-quran

        return (
          <span key={index} className="text-green-600 font-quran text-2xl">
            {part}
          </span>
        );
      } else if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span key={index} className="text-blue-600 font-hadith text-2xl">
            {part}
          </span>
        );
      } else if (
        /[➊➋➌➍➎➏➐➑➒➓⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿]/.test(
          part
        )
      ) {
        return (
          <span key={index} className="text-[#C9A227] text-2xl">
            {part}
          </span>
        );
      } else {
        // Regular text - no styling
        return <span key={index}>{part}</span>;
      }
    });
  }

  // React component to render Islamic text
  function IslamicTextRenderer({
    text,
    className = "text-gray-800 text-lg/9",
  }) {
    const parsedElements = parseIslamicTextToJSX(text);

    return <p className={([className], "leading-10")}>{parsedElements}</p>;
  }

  return (
    <div className="space-y-6">
      {verses.map((ayah, index) => (
        <div
          key={ayah.number}
          className="bg-white shadow-lg rounded-lg p-6 md:px-8  relative border-2 border-neutral-200"
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
                      <div key={identifier} className="mb-4 ">
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
              onClick={() => openTafsirModal(ayah.numberInSurah)}
              className="mt-2 flex cursor-pointer items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <IoBookOutline className="text-white" size={24} />
              {t("quranDetails.checkTafsir")}
            </button>
          </div>
        </div>
      ))}

      {/* Tafsir Modal */}
      {showModal && (
        <div
          className="custom-backdrop fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 shadow-lg max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Close Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-red-600 hover:text-red-700 cursor-pointer transition"
            >
              <FaTimes className="text-2xl" />
            </button>

            <h2 className="text-xl font-bold text-center mb-4">
              {t("quranDetails.tafsir")}
            </h2>
            <p className="text-gray-800 text-lg/9">
              <IslamicTextRenderer text={selectedTafsir} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseCard;
