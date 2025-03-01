import React, { useState } from "react";

const HadithCard = ({ hadith }) => {
  const [showFull, setShowFull] = useState(false);
  const isTruncated = hadith.hadithEnglish.length > 250;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold text-gray-900">
        {hadith.chapter.chapterEnglish} {hadith?.headingEnglish && " - "}{" "}
        {hadith?.headingEnglish}
      </h3>
      <p className="text-gray-600 text-sm">{hadith.headingUrdu}</p>
      <p className="text-gray-500 text-xs">{hadith.headingArabic}</p>

      <p
        className={`text-green-600 mt-2 ${
          showFull || !isTruncated ? "block" : "line-clamp-3"
        }`}
      >
        {hadith.hadithArabic}
      </p>
      <p
        className={`text-gray-700 mt-2 ${
          showFull || !isTruncated ? "block" : "line-clamp-3"
        }`}
      >
        {hadith.hadithUrdu}
      </p>
      <p
        className={`text-gray-800 mt-2 ${
          showFull || !isTruncated ? "block" : "line-clamp-3"
        }`}
      >
        {hadith.hadithEnglish}
      </p>

      {isTruncated && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-500 text-sm mt-2 underline"
        >
          {showFull ? "Show Less" : "Show More"}
        </button>
      )}

      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Hadith Number: {hadith.hadithNumber}</span>
        <span>
          Status: <span className="text-green-600">{hadith.status}</span>
        </span>
      </div>
    </div>
  );
};

export default HadithCard;
