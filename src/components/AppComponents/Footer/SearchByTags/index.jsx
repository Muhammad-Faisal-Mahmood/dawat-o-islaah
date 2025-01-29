import React from "react";
import { Link } from "react-router-dom";

const SearchByTags = () => {
  const itemsSearchByTags = ["Islaah", "Islamic", "Islamic Posts", "Prayer"];
  return (
    <div className=" flex-1 text-white space-y-4">
      <div className="space-y-1">
        <div className="text-2xl font-bold">Search By Tags</div>
        <div className="flex w-full ">
          <div className="border-[1px] border-amber-500 w-[40%]" />
          <div className="border-[1px] border-whitw w-[60%]" />
        </div>
      </div>
      <div className="text-lg mt-12 flex space-y-2 space-x-2 flex-wrap">
        {itemsSearchByTags.map((item, index) => (
          <Link
            key={index}
            className="p-2 border hover:border-amber-500 rounded  transition-all "
          >
            <text className="hover:text-amber-500 transition-all">{item}</text>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchByTags;
