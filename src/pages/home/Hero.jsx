import React from "react";
import SourceSearch from "../../components/AppComponents/Home/SourceSearch";

const Hero = () => {
  const date = "Monday, 11 Shaban 1446 Hijri - Pakistan";

  return (
    <div className="bg-[#157347] pt-60 pb-10 sm:pb-16 lg:pb-20 w-full flex text-white flex-col items-center gap-y-4 sm:gap-y-5 px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        Explore the Light of Islam
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-center">
        {date}
      </h2>
      <SourceSearch />
    </div>
  );
};

export default Hero;
