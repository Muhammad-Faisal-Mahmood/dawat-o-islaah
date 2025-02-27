import React from "react";
import { Link } from "react-router-dom";

const SurahCard = ({
  number,
  englishName,
  englishNameTranslation,
  numberOfAyahs,
  revelationType,
  arabicName,
}) => {
  return (
    <Link to={`/surah/${number}`} className="block">
      <div className="flex justify-between items-center px-6 py-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer relative">
        {/* Left Side */}
        <div>
          <h3 className="text-xl font-semibold">
            {number}. {englishName} ({englishNameTranslation})
          </h3>
          <p className="text-md text-gray-500">
            {revelationType} | {numberOfAyahs} Verses
          </p>
        </div>
        {/* Right Side - Arabic Name */}
        <div className="text-blue-600 text-2xl font-bold">{arabicName}</div>

        {/* Horizontal Rule (disappears on hover) */}
        <hr className="absolute bottom-0 left-0 w-full border-gray-300 transition-opacity duration-300 hover:opacity-0" />
      </div>
    </Link>
  );
};

export default SurahCard;
