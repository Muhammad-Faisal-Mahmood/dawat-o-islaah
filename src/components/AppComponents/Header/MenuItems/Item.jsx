import React, { useState } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { ChevronDown, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../../context/LanguageContext";

const Item = ({ item, options }) => {
  const translation = useTranslation();
  const itemWord = translation?.header?.[item];
  const { language } = useLanguage();

  const itemsWithArrow = ["books", "islamicCalculator", "masnoonDuas"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={"/"}
        className={`cursor-pointer text-lg font-sans flex items-center transition-all duration-300 ${
          isHovered ? "text-amber-400" : "text-white"
        }`}
      >
        {itemWord}
        {options.length > 0 && (
          <ChevronDown className="ml-1 transition-transform duration-300" />
        )}
      </Link>

      {options.length > 0 && (
        <div className="absolute left-0 w-52 pt-4">
          <div
            className={`bg-amber-400 text-black shadow-lg rounded-lg p-2 transition-all duration-300 ease-out transform ${
              isHovered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            {options.map((option, index) => (
              <Link
                to={"/"}
                key={index}
                className={`flex items-center justify-between py-2 px-2 text-white cursor-pointer transition-all duration-300 hover:text-gray-800 ${
                  language === "en" ? "hover:-mr-1" : "hover:-ml-1"
                }  hover:scale-100`}
              >
                {language === "en" ? (
                  <>
                    {translation?.header?.[option]}
                    <ArrowRight size={20} />
                  </>
                ) : (
                  <>
                    <ArrowLeft size={20} />
                    {translation?.header?.[option]}
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
