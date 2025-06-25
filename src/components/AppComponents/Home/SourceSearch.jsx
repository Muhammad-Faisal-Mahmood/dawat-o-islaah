import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const SourceSearch = () => {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState(
    t("sourceSearch.options.quran")
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Use translation for options
  const searchOptions = [
    t("sourceSearch.options.quran"),
    t("sourceSearch.options.hadith"),
    // t("sourceSearch.options.articles"),
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass both source and query as query params
    navigate(
      `/search?source=${encodeURIComponent(
        selectedOption
      )}&q=${encodeURIComponent(searchTerm)}`
    );
  };

  return (
    <form
      className="flex items-center bg-white rounded-md overflow-visible shadow-md relative"
      onSubmit={handleSearch}
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder={t("sourceSearch.placeholder")}
        className="px-4 py-2 w-full max-w-[200px] sm:max-w-[300px] outline-none text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown for Desktop and Icon for Mobile */}
      <div className="relative">
        {/* Desktop Dropdown */}
        <div className="hidden sm:block">
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className="px-4 py-2 bg-gray-100 border-l text-black outline-none"
          >
            {searchOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Dropdown Icon */}
        <div className="block sm:hidden relative">
          <button
            className="px-4 py-2 bg-gray-100 border-l"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Select Option"
          >
            <FaChevronDown className="text-gray-600" />
          </button>

          {/* Dropdown Options (Visible only when icon clicked) */}
          {showDropdown && (
            <div className="absolute left-0 top-full mt-1 w-40 bg-white border rounded-md shadow-lg z-50">
              {searchOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button type="submit" className="px-4 py-2 bg-gray-100 border-l">
        <FaSearch className="text-gray-600" />
      </button>
    </form>
  );
};

export default SourceSearch;
