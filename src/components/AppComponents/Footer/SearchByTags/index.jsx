import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../../context/LanguageContext";

const SearchByTags = () => {
  const { t } = useLanguage();
  const itemsSearchByTags = t("footer.itemsSearchByTags");

  return (
    <div className=" flex-1 text-white space-y-4">
      <div className="space-y-1">
        <div className="text-2xl font-bold">{t("footer.searchByTags")}</div>
        <div className="flex w-full ">
          <div className="border-[1px] border-amber-500 w-[40%]" />
          <div className="border-[1px] border-whitw w-[60%]" />
        </div>
      </div>
      <div className="text-lg mt-12 flex space-y-2 space-x-2 flex-wrap">
        {itemsSearchByTags.map((item, index) => (
          <Link
            key={index}
            className="p-2 border hover:border-amber-500 rounded  transition-all h-12"
          >
            <div className="hover:text-amber-500 transition-all">{item}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchByTags;
