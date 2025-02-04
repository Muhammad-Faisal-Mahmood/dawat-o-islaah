import React from "react";
import ZikrOAzkar from "./ZikrOAzkar";
import RecentPosts from "./RecentPosts";
import Socials_Posts_Section from "./Socials_Posts_Section";
import YouMayHaveMissed from "./YouMayHaveMissed";
import Services from "./Services";

const index = () => {
  return (
    <div className="px-20 py-12 flex flex-col gap-y-10">
      <ZikrOAzkar />
      <RecentPosts />
      <Socials_Posts_Section />
      <Services />
      <YouMayHaveMissed />
    </div>
  );
};

export default index;
