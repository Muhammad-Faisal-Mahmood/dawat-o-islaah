import Intro from "./Intro";
import SearchByCategory from "./SearchByCategory";
import SearchByPosts from "./SearchByPosts";
import SearchByTags from "./SearchByTags";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row lg:justify-around lg:items-start py-16 px-10 md:px-16 lg:px-20 bg-[#157347] space-x-10 border-t-3 border-amber-500">
      <Intro />
      <SearchByCategory />
      <SearchByPosts />
      <SearchByTags />
    </div>
  );
};

export default Footer;
