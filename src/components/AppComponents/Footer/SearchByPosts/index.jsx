import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../../context/LanguageContext";

const SearchByPosts = () => {
  const { t } = useLanguage();
  const itemsSearchByPosts = t("footer.itemsSearchByPosts");

  return (
    <div className=" flex-1 text-white space-y-4">
      <div className="space-y-1">
        <div className="text-2xl font-bold">{t("footer.searchByItems")}</div>
        <div className="flex w-full ">
          <div className="border-[1px] border-amber-500 w-[40%]" />
          <div className="border-[1px] border-whitw w-[60%]" />
        </div>
      </div>
      <div className="text-lg mt-12">
        {itemsSearchByPosts.map((item, index) => (
          <div key={index} className="">
            {/* <div className="border-2 border-white" /> */}

            <Link className="flex items-center space-x-2">
              <span className="border-l-4 h-5 " />
              <div className="hover:text-amber-400 transition-all">{item}</div>
            </Link>
            {index < itemsSearchByPosts.length - 1 && (
              <div className="border border-amber-500 my-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchByPosts;
