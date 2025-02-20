import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const HeaderBanner = () => {
  const city = "Islamabad";
  const prayerTimes = {
    Fajr: "5:20 AM",
    Duhr: "12:35 PM",
  };
  const languages = ["English", "اردو"];

  return (
    <div className="bg-[#1E3A5F] py-2 px-5 md:px-10 text-white text-sm flex justify-between">
      {/* Left Section: Location and Prayer Times */}
      <div className="flex gap-4">
        {/* Location */}
        <div className="flex items-center gap-x-1">
          <FaLocationDot color="red" />
          <h1>{city}</h1>
        </div>

        {/* Prayer Times */}
        <div className="hidden md:flex ">
          <h1>Prayer times:</h1>
          {Object.entries(prayerTimes).map(([prayer, time], index, array) => (
            <h1 key={prayer} className="ml-1">
              {/* Add a space before the prayer name */}
              {" " + prayer}: {time}
              {/* Add | separator only if it's not the last item */}
              {index < array.length - 1 ? " |" : ""}
            </h1>
          ))}
        </div>
      </div>

      {/* Right Section: Language Selector */}
      <div className="flex gap-2">
        <h1>Language:</h1>
        {languages.map((lang, index, array) => (
          <h1 key={index}>
            {lang}
            {/* Add | separator only if it's not the last item */}
            {index < array.length - 1 ? " |" : ""}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default HeaderBanner;
