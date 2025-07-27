import { useEffect, useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const SourceSearch = () => {
  const { t } = useLanguage();
  const [selectedKey, setSelectedKey] = useState("quran");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Options with keys and dynamic labels
  const searchOptions = [
    { key: "quran", label: t("sourceSearch.options.quran") },
    { key: "hadith", label: t("sourceSearch.options.hadith") },
    // { key: "articles", label: t("sourceSearch.options.articles") },
  ];

  // Get current label based on selected key
  const selectedOption = t(`sourceSearch.options.${selectedKey}`);

  const handleSearch = (e) => {
    e.preventDefault();
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
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="px-4 py-2 bg-gray-100 border-l text-black outline-none cursor-pointer"
          >
            {searchOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Dropdown */}
        <div className="block sm:hidden relative">
          <button
            className="px-4 py-2 bg-gray-100 border-l"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Select Option"
          >
            <FaChevronDown className="text-gray-600" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-md shadow-xl border border-gray-300 z-50">
              {searchOptions.map((option) => (
                <div
                  key={option.key}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => {
                    setSelectedKey(option.key);
                    setShowDropdown(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-gray-100 border-l cursor-pointer"
      >
        <FaSearch className="text-gray-600" />
      </button>
    </form>
  );
};

export default SourceSearch;
