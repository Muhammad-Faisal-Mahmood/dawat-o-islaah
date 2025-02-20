import React, { useState } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const translation = useTranslation();
  const itemWord = translation?.header?.[item];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`#`}
        className={`cursor-pointer uppercase font-bold tracking-tight text-base  flex items-center transition-all duration-300 ${
          isHovered ? "text-white" : "text-[#1E3A5F]"
        }`}
      >
        {itemWord}
      </Link>
    </div>
  );
};

export default Item;
