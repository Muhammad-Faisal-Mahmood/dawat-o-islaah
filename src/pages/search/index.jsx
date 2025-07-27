import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HADITH_API_KEY =
  "$2y$10$d4nL2E660zHHBrwTB7Bviu3WvW5sToLRBWFbJ1yhn7rJzSuNpA0S";
const ITEMS_PER_PAGE = 10;

function highlightText(text, term) {
  if (!term || !text) return text;
  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className="bg-yellow-200 text-yellow-900 font-semibold rounded px-1"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

const Search = () => {
  const query = useQuery();
  const source = query.get("source");
  const keyword = query.get("q");
  const { t } = useLanguage();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [hadithTotal, setHadithTotal] = useState(0);
  const [hadithLastPage, setHadithLastPage] = useState(1);

  const isQuran =
    source?.toLowerCase().includes("quran") ||
    source?.includes("القرآن") ||
    source?.toLowerCase() === "alquran";
  const isHadith =
    source?.toLowerCase().includes("hadith") || source?.includes("حدیث");

  const isUrdu = source === "القرآن" || source === "حدیث";

  useEffect(() => {
    if (!source || !keyword) return;

    setLoading(true);
    setError("");
    setResults([]);
    setCurrentPage(1);
    setHadithTotal(0);
    setHadithLastPage(1);

    if (isQuran) {
      const lang = isUrdu ? "ur" : "en";
      fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(
          keyword
        )}/all/${lang}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.data?.matches || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch Quran results.");
          setLoading(false);
        });
    } else if (isHadith) {
      const keyParam = isUrdu ? "hadithUrdu" : "hadithEnglish";
      fetch(
        `https://hadithapi.com/api/hadiths?apiKey=${HADITH_API_KEY}&${keyParam}=${encodeURIComponent(
          keyword
        )}&paginate=${ITEMS_PER_PAGE}&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          const hadiths = data.hadiths?.data || [];
          setResults(hadiths);
          setHadithTotal(data.hadiths?.total || hadiths.length);
          setHadithLastPage(data.hadiths?.last_page || 1);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch Hadith results.");
          setLoading(false);
        });
    }
  }, [source, keyword]);

  const handleHadithPageChange = (page) => {
    setLoading(true);
    setError("");
    setResults([]);
    setCurrentPage(page);

    const keyParam = isUrdu ? "hadithUrdu" : "hadithEnglish";
    fetch(
      `https://hadithapi.com/api/hadiths?apiKey=${HADITH_API_KEY}&${keyParam}=${encodeURIComponent(
        keyword
      )}&paginate=${ITEMS_PER_PAGE}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        const hadiths = data.hadiths?.data || [];
        setResults(hadiths);
        setHadithTotal(data.hadiths?.total || hadiths.length);
        setHadithLastPage(data.hadiths?.last_page || 1);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Hadith results.");
        setLoading(false);
      });
  };

  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const paginatedResults = isQuran
    ? results.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : results;

  const handlePrev = () => {
    if (isQuran) {
      setCurrentPage((p) => Math.max(1, p - 1));
    } else {
      if (currentPage > 1) handleHadithPageChange(currentPage - 1);
    }
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleNext = () => {
    if (isQuran) {
      setCurrentPage((p) => Math.min(totalPages, p + 1));
    } else {
      if (currentPage < hadithLastPage) handleHadithPageChange(currentPage + 1);
    }
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  if (keyword === "") {
    return (
      <div>
        <p className="text-xl text-center text-gray-900 my-12">
          {t("searchPage.noSearchKeyword")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[60vh]">
      <h2 className="text-3xl font-bold my-8 text-center text-[#1E3A5F]">
        {t("searchPage.title")}
      </h2>
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <>
          {paginatedResults.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {isQuran
                  ? paginatedResults.map((item) => (
                      <li
                        key={item?.number}
                        className="bg-white border-2 border-neutral-200 rounded-lg shadow p-6"
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#157347]">
                            Surah {item?.surah?.number}:{" "}
                            {item?.surah?.englishName || item?.surah?.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            | Ayah {item?.numberInSurah}
                          </span>
                        </div>
                        <div className="text-lg text-gray-800 leading-relaxed">
                          {highlightText(item?.text, keyword)}
                        </div>
                      </li>
                    ))
                  : paginatedResults.map((item) => (
                      <li
                        key={item.id}
                        className="bg-white border-2 border-neutral-200 rounded-lg shadow p-6"
                      >
                        <div className=" text-[#157347] pb-2">
                          {item?.book?.bookName && (
                            <span>
                              <span className="font-semibold">Book:</span>{" "}
                              {item.book.bookName}
                            </span>
                          )}
                          {item?.chapter && (
                            <span>
                              {" "}
                              | <span className="font-semibold">
                                Chapter:
                              </span>{" "}
                              {isUrdu
                                ? item?.chapter?.chapterUrdu
                                : item?.chapter?.chapterEnglish}
                            </span>
                          )}
                          {item?.hadithNumber && (
                            <span>
                              {" "}
                              | <span className="font-semibold">
                                Hadith #:
                              </span>{" "}
                              {item?.hadithNumber}
                            </span>
                          )}
                        </div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-lg text-gray-800 leading-12">
                            {highlightText(
                              isUrdu ? item?.hadithUrdu : item?.hadithEnglish,
                              keyword
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
              </ul>
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="font-semibold text-[#1E3A5F]">
                  Page {currentPage} of {isQuran ? totalPages : hadithLastPage}
                </span>
                <button
                  onClick={handleNext}
                  disabled={
                    isQuran
                      ? currentPage === totalPages
                      : currentPage === hadithLastPage
                  }
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
