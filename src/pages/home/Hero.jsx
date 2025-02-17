import React from "react";
import SourceSearch from "../../components/AppComponents/Home/SourceSearch";
import ZikrOAzkar from "./ZikrOAzkar";

const Hero = () => {
  const date = "Monday , 11 Shaban 1446 Hijri - Pakistan";
  return (
    <div className="bg-[#157347] pt-60 pb-20 w-full flex text-white flex-col items-center gap-y-5">
      <h1 className="text-5xl font-bold">Explore the Light of Islam</h1>
      <h1 className="text-2xl font-medium">{date}</h1>
      <SourceSearch />
    </div>
  );
};

export default Hero;
