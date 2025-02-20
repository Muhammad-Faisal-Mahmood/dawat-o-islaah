import React from "react";
import DailyCard from "../../components/AppComponents/Home/DailyCard";

const DailyVerseHadees = () => {
  const verse = {
    arabic: "يَدْعُونَ فِيهَا بِكُلِّ فَاكِهَةٍ آمِنِينَ",
    urdu: "وہ ہر قسم کے پھلوں کو بلا خوف و خطر طلب کریں گے۔",
    english:
      "They will call therein for every kind of fruit, secure from all harm.",
    reference: "Surah Waqiah - Verse 32",
  };

  const hadees = {
    arabic:
      "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    urdu: "اعمال کا دارومدار نیتوں پر ہے، اور ہر آدمی کو وہی ملے گا جس کی اس نے نیت کی۔",
    english:
      "Actions are judged by intentions, and everyone will get what was intended.",
    reference: "Sahih Bukhari - Hadith 1",
  };

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
