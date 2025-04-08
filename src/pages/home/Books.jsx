import React from "react";
import BookInfoCard from "../../components/AppComponents/Home/BookInfoCard";

const Books = () => {
  const books = [
    {
      title: "Al-QURAN",
      description:
        "Recite Quran Kareem with 2 Translations, Words by Words Translation & Tafaseer",
      linkText: "Recite Quran",
      link: "alQuran",
      icon: "📖",
    },
    {
      title: "AL-HADITH",
      description:
        "Explore 18 Books of Nabi Kareem ﷺ ahadees in Arabic, Urdu & English",
      linkText: "Recite Hadith",
      link: "alHadith",
      icon: "📜",
    },
    {
      title: "ISLAMIC BOOKS",
      description: "Read Popular Islamic books according to your interest",
      linkText: "Read Books",
      link: "islamicBooks",
      icon: "📚",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Featured Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-20">
        {books.map((book, index) => (
          <BookInfoCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
