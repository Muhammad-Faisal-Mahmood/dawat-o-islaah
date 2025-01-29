import React from "react";
import ZikrOAzkar from "./ZikrOAzkar";
import RecentPosts from "./RecentPosts";
import PageLayout from "./PageLayout";
import YouMayHaveMissed from "./YouMayHaveMissed";

const index = () => {
  return (
    <div className="px-20 py-12 flex flex-col gap-y-10">
      <ZikrOAzkar />
      <RecentPosts />
      <PageLayout />
      <YouMayHaveMissed />
    </div>
  );
};

export default index;
