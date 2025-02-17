import React from "react";
import { FaSearch } from "react-icons/fa";

const SourceSearch = () => {
  const searchOptions = ["Al-Quran", "Hadith", "Articles"];

  return (
    <div className="flex bg-white rounded-md overflow-hidden shadow-md">
      <input
        type="text"
        placeholder="Search for..."
        className="px-4 py-2 w-64 outline-none text-black"
      />
      <select className="px-4 py-2 bg-gray-100 border-l text-black outline-none">
        {searchOptions.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      <button className="px-4 py-2 bg-gray-100 border-l">
        <FaSearch className="text-gray-600" />
      </button>
    </div>
  );
};

export default SourceSearch;
