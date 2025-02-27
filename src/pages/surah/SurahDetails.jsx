import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah";
import TranslationList from "./TranslationList"; // Import TranslationList
import { FaChevronDown } from "react-icons/fa"; // Icons
import ShimmerLoader from "./SurahShimmer";

const SurahDetails = () => {
  const { surahNumber } = useParams();
  const {
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
  } = useSurah(surahNumber);

  const [showDropdown, setShowDropdown] = useState({ en: false, ur: false });

  // Function to Toggle Dropdown
  const toggleDropdown = (lang) => {
    setShowDropdown((prev) => ({ ...prev, [lang]: !prev[lang] }));
  };

  // Function to Handle Translation Selection
  const handleTranslationChange = (lang, identifier) => {
    setSelectedTranslations((prev) => ({
      ...prev,
      [lang]: prev[lang].includes(identifier)
        ? prev[lang].filter((id) => id !== identifier) // Remove if already selected
        : [...prev[lang], identifier], // Add if not selected
    }));
  };

  if (loadingDetails) return <ShimmerLoader />;
  if (error)
    return <p className="text-center text-red-500 py-6 text-lg">{error}</p>;

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      {/* Surah Name & Details */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          {surahDetails.englishName} ({surahDetails.englishNameTranslation})
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {surahDetails.revelationType} | {surahDetails.numberOfAyahs} Verses
        </p>
        <p className="text-3xl text-blue-600 font-bold mt-4">
          {surahDetails.name}
        </p>
      </div>

      {/* Translation Selection Dropdowns */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {["en", "ur"].map((lang) => (
          <div key={lang} className="relative w-full md:w-1/2">
            <button
              onClick={() => toggleDropdown(lang)}
              className="w-full bg-gray-100 p-2 border border-gray-300 rounded-md flex justify-between items-center"
            >
              Select {lang === "en" ? "English" : "Urdu"} Translations
              <FaChevronDown />
            </button>

            {showDropdown[lang] && (
              <div className="absolute w-full bg-white shadow-lg rounded-md mt-2 z-10 max-h-60 overflow-auto">
                {translationOptions[lang].map((option) => (
                  <label
                    key={option.identifier}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTranslations[lang].includes(
                        option.identifier
                      )}
                      onChange={() =>
                        handleTranslationChange(lang, option.identifier)
                      }
                      className="mr-2"
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show "Loading Translations..." only for verses */}
      {loadingVerses ? (
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return <ShimmerLoader />;
          })}
        </div>
      ) : (
        <TranslationList
          verses={verses}
          translations={translations}
          audioLinks={audioLinks}
        />
      )}
    </div>
  );
};

export default SurahDetails;
