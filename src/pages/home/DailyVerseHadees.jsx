import React from "react";
import DailyCard from "../../components/AppComponents/Home/DailyCard";
import verses from "../../../data/dailyHadithVerse/dailyVerse.json";
import hadiths from "../../../data/dailyHadithVerse/dailyHadith.json";

const DailyVerseHadees = () => {
  const currentDay = new Date().getDate();

  // Use modulo to ensure we stay within array bounds
  const verseIndex = (currentDay - 1) % verses.length;
  const hadeesIndex = (currentDay - 1) % hadiths.length;

  // Get today's verse and hadith
  const verse = verses[verseIndex];
  const hadees = hadiths[hadeesIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 lg:px-32 px-10 sm:px-14 md:px-20">
      {/* Verse of the Day */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Verse of the Day
        </h3>
        <DailyCard
          arabicText={verse.arabic}
          urduText={verse.urdu}
          englishText={verse.english}
          reference={verse.reference}
          isVerse={true} // Pass `true` for verse
        />
      </div>

      {/* Hadees of the Day */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Hadees of the Day
        </h3>
        <DailyCard
          arabicText={hadees.arabic}
          urduText={hadees.urdu}
          englishText={hadees.english}
          reference={hadees.reference}
          isVerse={false} // Pass `false` for hadees
        />
      </div>
    </div>
  );
};

export default DailyVerseHadees;
