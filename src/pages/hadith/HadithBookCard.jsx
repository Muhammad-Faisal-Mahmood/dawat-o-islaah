import React from "react";
import { useNavigate } from "react-router-dom";

const HadithBookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/alHadith/${book.bookSlug}`)}
      className="transition-transform transform hover:scale-105 shadow-lg bg-white p-4 rounded-lg text-center cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-gray-900">{book.bookName}</h3>
      <p className="text-gray-600 text-sm">{book.writerName}</p>
      <p className="text-gray-500 text-xs">Died: {book.writerDeath}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <span className="bg-green-200 text-green-800 px-2 py-1 text-xs rounded">
          Hadiths: {book.hadiths_count}
        </span>
        <span className="bg-blue-200 text-blue-800 px-2 py-1 text-xs rounded">
          Chapters: {book.chapters_count}
        </span>
      </div>
    </div>
  );
};

export default HadithBookCard;
