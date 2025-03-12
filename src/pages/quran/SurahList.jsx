import React from "react";
import useSurahList from "../../hooks/useSurahList";
import SurahCard from "./SurahCard";

const SurahList = () => {
  const { surahs, loading, error } = useSurahList();

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quran Surahs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:mx-20">
        {surahs.map((surah) => (
          <SurahCard
            key={surah.number}
            number={surah.number}
            englishName={surah.englishName}
            englishNameTranslation={surah.englishNameTranslation}
            numberOfAyahs={surah.numberOfAyahs}
            revelationType={surah.revelationType}
            arabicName={surah.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SurahList;
