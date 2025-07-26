import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const HadithCard = ({ hadith }) => {
  const { t } = useLanguage();
  const [showFull, setShowFull] = useState(false);
  const isTruncated = hadith?.hadithEnglish?.length > 250;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          {hadith?.chapter?.chapterEnglish} {hadith?.headingEnglish && " - "}{" "}
          {hadith?.headingEnglish}
        </h3>
        <p className="text-gray-500 text-2xl  pb-4 font-hadith">
          {hadith?.headingArabic}
        </p>
      </div>

      <div className="text-end">
        <p className="text-gray-600 text-lg leading-12">
          {hadith?.headingUrdu}
        </p>

        <p
          className={`text-green-600 leading-12 text-2xl font-semibold font-hadith mt-2 ${
            showFull || !isTruncated ? "block" : "line-clamp-3"
          }`}
        >
          {hadith?.hadithArabic}
        </p>
        <p
          className={` text-lg leading-12 pt-2 ${
            showFull || !isTruncated ? "block" : "line-clamp-3"
          }`}
        >
          {hadith?.hadithUrdu}
        </p>
      </div>
      <p
        className={`text-gray-800 pt-2 leading-12 ${
          showFull || !isTruncated ? "block" : "line-clamp-3"
        }`}
      >
        {hadith?.hadithEnglish}
      </p>

      {/* {isTruncated && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-500 text-sm mt-2 underline"
        >
          {showFull ? t("hadithCard.showLess") : t("hadithCard.showMore")}
        </button>
      )} */}

      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>
          {t("hadithCard.hadithNumber")}: {hadith?.hadithNumber}
        </span>
        <span>
          {t("hadithCard.status")}:{" "}
          <span className="text-green-600">{hadith?.status}</span>
        </span>
      </div>
    </div>
  );
};

export default HadithCard;
