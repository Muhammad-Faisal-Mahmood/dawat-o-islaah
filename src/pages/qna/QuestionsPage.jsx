import { useState, useEffect, Suspense, lazy } from "react";
import { Search } from "lucide-react";
import { useQnaContext } from "../../context/QnaContext";
import useQnas from "../../hooks/useQnas";
import { useLanguage } from "../../context/LanguageContext";

const QuestionCard = lazy(() => import("./QuestionCard"));
const LoadingSpinner = lazy(() => import("./LoadingSpinner"));

const QuestionsPage = () => {
  const { t } = useLanguage();
  const { questions, isLoading, error } = useQnas();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!questions || questions.length === 0) {
      setFilteredQuestions([]);
      return;
    }

    const approvalStatusChecked = questions.filter(
      (question) => question.answer?.approval_status == "approved"
    );
    // const approvalStatusChecked = questions;

    if (searchTerm.trim() === "") {
      setFilteredQuestions(approvalStatusChecked);
      return;
    }

    const filtered = approvalStatusChecked.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);

  const highlightSearchTerm = (text) => {
    if (!text || !searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700">
            {t("qna.error")}
          </h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            {t("qna.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl ms:text-3xl font-bold text-gray-800 mb-4 md:mb-8 text-center">
        {t("qna.pageTitle")}
      </h1>

      {/* Search Bar */}
      <div className="mb-4 md:mb-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder={t("qna.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        }
      >
        {isLoading && questions.length == 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : !filteredQuestions || filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              {searchTerm
                ? t("qna.noQuestionsFound").replace("{term}", searchTerm)
                : t("qna.noQuestionsAvailable")}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-1">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                highlightSearchTerm={highlightSearchTerm}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default QuestionsPage;
