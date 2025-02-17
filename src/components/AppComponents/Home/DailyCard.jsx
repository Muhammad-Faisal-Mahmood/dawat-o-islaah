import React from "react";
import { FaShareAlt, FaDownload, FaBookOpen } from "react-icons/fa";

const DailyCard = ({
  arabicText,
  urduText,
  englishText,
  reference,
  isVerse,
}) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 bg-white flex flex-col ${
        isVerse ? "border-t-4 border-green-500" : "border-t-4 border-blue-500"
      }`}
      style={{ minHeight: "300px" }} // Set a fixed height or min-height
    >
      {/* Reference at the top (left-aligned) */}
      <p className="text-xs text-gray-500 text-left mb-2">{reference}</p>

      {/* Content Section (flex-grow to take remaining space) */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Arabic Text (center-aligned) */}
        <p className="text-center font-arabic text-2xl text-gray-900 leading-loose">
          {arabicText}
        </p>

        {/* Urdu Translation (center-aligned) */}
        <p className="text-center text-lg text-gray-800 mt-2 font-nastaliq">
          {urduText}
        </p>

        {/* English Translation (center-aligned) */}
        <p className="text-center text-sm text-gray-700 mt-2">{englishText}</p>
      </div>

      {/* Horizontal Rule */}
      <hr className="mt-4 border-gray-300" />

      {/* Actions Section (pushed to the bottom) */}
      <div className="flex justify-between mt-3 text-[#1E3A5F]">
        <button className="flex items-center gap-1 text-sm font-medium">
          <FaShareAlt color="black" /> Share Now
        </button>
        <button className="flex items-center gap-1 text-sm font-medium">
          <FaDownload color="black" /> Download
        </button>
        <button className="flex items-center gap-1 text-sm font-medium">
          <FaBookOpen color="black" /> Read Complete
        </button>
      </div>
    </div>
  );
};

export default DailyCard;
