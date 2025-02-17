import React from "react";
import { Link } from "react-router-dom";

const BookInfoCard = ({ title, description, link, linkText, icon }) => {
  return (
    <div className="p-4 rounded-lg shadow-md flex gap-x-5 items-center justify-between bg-white">
      <div className="text-5xl">{icon}</div>
      <div className="text-left">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 min-h-[60px] flex items-center">
          {description}
        </p>
        <Link to={link} className="text-blue-500 font-medium mt-2 inline-block">
          {linkText} →
        </Link>
      </div>
    </div>
  );
};

export default BookInfoCard;
