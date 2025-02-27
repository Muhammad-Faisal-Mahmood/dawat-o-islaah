import ZikrOAzkar from "./ZikrOAzkar";
import RecentArticles from "./RecentArticles";
import Services from "./Services";
import Hero from "./Hero";
import Books from "./Books";
import SihahSitta from "./SihahSitta";
import DailyVerseHadees from "./DailyVerseHadees";

const index = () => {
  return (
    <div className="flex flex-col gap-y-28 mb-20">
      {/* <Hero /> */}
      <ZikrOAzkar />
      <Books />
      <SihahSitta />
      <DailyVerseHadees />
      <Services />
      <RecentArticles />
    </div>
  );
};

export default index;
