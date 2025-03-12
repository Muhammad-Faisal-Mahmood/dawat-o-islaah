import React from "react";
import { useParams } from "react-router-dom";
import useHadithChapters from "../../hooks/useHadithChapters";
import ChapterCard from "./ChapterCard";
import ShimmerLoader from "../../components/AppComponents/Hadith/ShimmerLoader"; // Reuse shimmer loader for consistency

const HadithBookChapters = () => {
  const { bookSlug } = useParams();
  const { chapters, loading, error } = useHadithChapters();

  if (loading) return <ShimmerLoader />;
  if (error)
    return (
      <p className="text-center text-red-500 mt-6">Error: {error.message}</p>
    );

  return (
    <div className="container mx-auto px-4 md:px-20 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Chapters of {bookSlug.replace("-", " ")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters?.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
};

export default HadithBookChapters;
