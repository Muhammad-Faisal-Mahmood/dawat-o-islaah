import React from "react";
import { Link } from "react-router-dom";

const SihahSittaGrid = ({ books }) => (
  <div className="grid grid-cols-3 gap-4">
    {books.map((book, index) => (
      <Link
        to={book.link}
        key={index}
        className=" bg-white rounded-lg text-center shadow-lg flex flex-col items-center justify-center min-h-[120px] border-2 border-transparent hover:border-blue-500 transition-all duration-300 relative"
      >
        <div className="p-6 mt-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
          <p className="text-xl font-arabic text-[#1E3A5F]">{book.title}</p>
        </div>
        <p className="mt-2 mb-5 text-gray-600 text-sm">
          {book.transliteration}
        </p>
      </Link>
    ))}
  </div>
);

export default SihahSittaGrid;
