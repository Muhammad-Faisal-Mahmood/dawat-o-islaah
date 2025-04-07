import React, { useState } from "react";
import { useTranslation } from "../../../../hooks/useTranslation";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const translation = useTranslation();
  const itemWord = translation?.header?.[item];
  const [isHovered, setIsHovered] = useState(false);
  let route =
    item === "home"
      ? "/"
      : item === "alQuran"
      ? "alQuran"
      : item === "alHadith"
      ? "alHadith"
      : item === "islamicBooks"
      ? "islamicBooks"
      : item === "masail"
      ? "masail"
      : item === "login"
      ? "signin"
      : "#";

  return (
    <div
      className="relative group text-center py-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={route}
        className={`cursor-pointer uppercase font-bold tracking-tight text-base transition-all duration-300 ${
          isHovered ? "text-white" : "text-[#1E3A5F]"
        }`}
      >
        {itemWord}
      </Link>
    </div>
  );
};

export default Item;
