import React from "react";
import { useNavigate } from "react-router-dom";

const ChapterCard = ({ chapter }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/alHadith/${chapter.bookSlug}/${chapter.chapterNumber}`)
      }
      className="transition-transform cursor-pointer transform hover:scale-105 shadow-md bg-white p-4 rounded-lg border-b border-gray-300 hover:border-none"
    >
      <h3 className="text-xl font-semibold text-blue-600">
        {chapter.chapterNumber}. {chapter.chapterEnglish}
      </h3>
      <p className="text-gray-500 text-xl text-right">
        {chapter.chapterArabic}
      </p>
      <p className="text-gray-500 text-xl text-right">{chapter.chapterUrdu}</p>
      <div className="mt-2 flex justify-between text-sm  text-gray-600">
        <span>Book: {chapter.bookSlug.replace("-", " ")}</span>
      </div>
    </div>
  );
};

export default ChapterCard;
