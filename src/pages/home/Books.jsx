import React from "react";
import BookInfoCard from "../../components/AppComponents/Home/BookInfoCard";
import { useLanguage } from "../../context/LanguageContext";

const Books = () => {
  const { t } = useLanguage();

  const books = [
    {
      title: t("booksSection.quranTitle"),
      description: t("booksSection.quranDesc"),
      linkText: t("booksSection.quranLink"),
      link: "quran",
      icon: "📖",
    },
    {
      title: t("booksSection.hadithTitle"),
      description: t("booksSection.hadithDesc"),
      linkText: t("booksSection.hadithLink"),
      link: "hadith",
      icon: "📜",
    },
    {
      title: t("booksSection.islamicBooksTitle"),
      description: t("booksSection.islamicBooksDesc"),
      linkText: t("booksSection.islamicBooksLink"),
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
