import React from "react";
import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah";
import { FaPlay, FaRegFileAlt, FaBookOpen } from "react-icons/fa"; // Icons for Play & Tafseer

const SurahDetails = () => {
  const { surahNumber } = useParams();
  const { surah, translations, loading, error } = useSurah(surahNumber);

  if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 py-6 text-lg">{error}</p>;

  return (
    <div className="container mx-auto px-6 md:px-12 py-12">
      {/* Surah Name & Details */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          {surah.englishName} ({surah.englishNameTranslation})
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {surah.revelationType} | {surah.numberOfAyahs} Verses
        </p>
        <p className="text-3xl text-blue-600 font-bold mt-4">{surah.name}</p>
      </div>

      {/* Ayahs List */}
      <div className="space-y-10">
        {surah.ayahs.map((ayah, index) => (
          <div
            key={ayah.number}
            className="bg-white shadow-lg rounded-lg p-6 md:p-8 relative transition-all duration-300 hover:shadow-xl"
          >
            {/* Play Button */}
            <button className="absolute top-4 left-4 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition">
              <FaPlay className="text-lg" />
              <span className="text-sm hidden md:inline">Play Verse</span>
            </button>

            {/* Arabic Ayah */}
            <p className="text-2xl md:text-3xl text-blue-700 text-center pt-5 font-semibold leading-relaxed">
              {ayah.text}
            </p>

            {/* Urdu Translation */}
            <p className="text-center text-gray-500 italic text-md md:text-lg mt-4">
              {translations.ur[index]?.text || "Urdu Translation Not Available"}
            </p>

            {/* English Translation */}
            <p className="text-center text-gray-700 mt-4 text-lg">
              {translations.en[index]?.text ||
                "English Translation Not Available"}
            </p>

            {/* Ayah Number & Controls */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4 text-gray-600 text-sm md:text-md">
              <span className="mb-3 md:mb-0">
                Surah: {surah.number} | Verse: {ayah.numberInSurah}
              </span>
              <div className="flex items-center gap-6">
                {/* Read Tafseer */}
                <button className="cursor-pointer flex items-center gap-2 text-green-600 hover:text-green-800 transition">
                  <FaBookOpen />
                  <span>Read Tafseer</span>
                </button>

                {/* Read Translation */}
                <button className="cursor-pointer flex items-center gap-2 text-green-600 hover:text-green-800 transition">
                  <FaRegFileAlt />
                  <span>Read Translation</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetails;
