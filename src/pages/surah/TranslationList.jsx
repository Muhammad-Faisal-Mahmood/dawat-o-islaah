import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Icons

const TranslationList = ({ verses, translations, audioLinks, surahNo }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

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
  console.log("verses: ", verses);
  return (
    <div className="space-y-10">
      {verses.map((ayah, index) => (
        <div
          key={ayah.number}
          className="bg-white shadow-lg rounded-lg p-6 md:p-8 relative"
        >
          {/* Play/Pause Button */}
          <button
            onClick={() => playAudio(index)}
            className="absolute top-4 left-4 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition"
          >
            {playingIndex === index ? (
              <span className="flex gap-2 items-center">
                <FaPause className="text-lg" />
                <h3>Pause Verse</h3>
              </span>
            ) : (
              <span className="flex gap-2 items-center">
                <FaPlay className="text-lg" />
                <h3>Play Verse</h3>
              </span>
            )}
          </button>

          <p className="absolute top-4 right-4 text-gray-500 text-base md:text-lg lg:text-xl">
            {surahNo}:{ayah.numberInSurah}
          </p>

          {/* Arabic Ayah (Always Centered) */}
          <p className="text-2xl md:text-3xl text-blue-700 text-center pt-5 font-semibold">
            {ayah.text}
          </p>

          {/* Translations Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Left Column (English Translations) */}
            <div className="text-left">
              {Object.entries(translations.en).map(([identifier, ayahList]) => (
                <div key={identifier} className="mb-4">
                  <p className="text-gray-700 text-lg">
                    {ayahList[index]?.text || "Translation Not Available"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    - {identifier.replace("en.", "").toUpperCase()} (English)
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column (Urdu Translations) */}
            <div className="text-right">
              {Object.entries(translations.ur).map(([identifier, ayahList]) => (
                <div key={identifier} className="mb-4">
                  <p className="text-gray-700 text-lg">
                    {ayahList[index]?.text || "ترجمہ دستیاب نہیں"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    - {identifier.replace("ur.", "").toUpperCase()} (Urdu)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranslationList;
