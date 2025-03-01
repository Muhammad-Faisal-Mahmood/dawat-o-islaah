import React from "react";
import { useParams } from "react-router-dom";
import useHadiths from "../../hooks/useHadiths";
import HadithCard from "./HadithCard";
import ShimmerLoader from "../../components/AppComponents/Hadith/ShimmerLoader";

const HadithList = () => {
  const { bookSlug, chapterNo } = useParams();
  const {
    hadiths,
    loading,
    error,
    loadMore,
    currentPage,
    totalPages,
    isFetchingMore,
  } = useHadiths();

  if (loading && currentPage === 1) return <ShimmerLoader />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-6">Error: {error.message}</p>
    );

  console.log("hadiths data", hadiths);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Hadiths in {bookSlug.replace("-", " ")} - Chapter {chapterNo}
      </h2>
      <h2 className="text-2xl font-bold text-center mb-6">
        " {hadiths[0]?.chapter?.chapterEnglish} "
      </h2>
      <div>
        {hadiths.map((hadith) => (
          <HadithCard key={hadith.id} hadith={hadith} />
        ))}
      </div>

      {currentPage < totalPages && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
            disabled={isFetchingMore}
          >
            {isFetchingMore ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default HadithList;
