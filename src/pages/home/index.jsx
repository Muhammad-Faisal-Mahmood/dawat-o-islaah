import React from "react";
import ZikrOAzkar from "./ZikrOAzkar";
import RecentPosts from "./RecentPosts";
import Socials_Posts_Section from "./Socials_Posts_Section";
import YouMayHaveMissed from "./YouMayHaveMissed";
import Services from "./Services";
import Hero from "./Hero";

const index = () => {
  return (
    <div className=" py-12 flex flex-col gap-y-10">
      <Hero />
      <ZikrOAzkar />
      {/* <RecentPosts />
      <Socials_Posts_Section /> */}
      <Services />
      <YouMayHaveMissed />
    </div>
  );
};

export default index;
