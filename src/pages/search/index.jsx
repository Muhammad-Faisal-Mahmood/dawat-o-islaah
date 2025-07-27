import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Hadith API pagination
  const [hadithTotal, setHadithTotal] = useState(0);
  const [hadithLastPage, setHadithLastPage] = useState(1);

  useEffect(() => {
    if (!source || !keyword) return;

    setLoading(true);
    setError("");
    setResults([]);
    setCurrentPage(1);
    setHadithTotal(0);
    setHadithLastPage(1);

    if (source.toLowerCase().includes("quran")) {
      fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(
          keyword
        )}/all/en`
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
    } else if (source.toLowerCase().includes("hadith")) {
      fetch(
        `https://hadithapi.com/api/hadiths?apiKey=${HADITH_API_KEY}&hadithEnglish=${encodeURIComponent(
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

  // Handle page change for Hadith API
  const handleHadithPageChange = (page) => {
    setLoading(true);
    setError("");
    setResults([]);
    setCurrentPage(page);

    fetch(
      `https://hadithapi.com/api/hadiths?apiKey=${HADITH_API_KEY}&hadithEnglish=${encodeURIComponent(
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

  // Pagination logic for Quran (client-side)
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const paginatedResults =
    source && source.toLowerCase().includes("quran")
      ? results.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : results;

  console.log(paginatedResults);

  const handlePrev = () => {
    if (source && source.toLowerCase().includes("quran")) {
      setCurrentPage((p) => Math.max(1, p - 1));
    } else {
      if (currentPage > 1) handleHadithPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (source && source.toLowerCase().includes("quran")) {
      setCurrentPage((p) => Math.min(totalPages, p + 1));
    } else {
      if (currentPage < hadithLastPage) handleHadithPageChange(currentPage + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1E3A5F]">
        Search Results
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
              <ul className="space-y-6">
                {source.toLowerCase().includes("quran")
                  ? paginatedResults.map((item) => (
                      <li
                        key={item?.number}
                        className="bg-white border-2 border-neutral-200 rounded-lg shadow p-4"
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#157347]">
                            Surah {item?.surah?.number}:{" "}
                            {item?.surah?.englishName} ({item?.surah?.name})
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
                        {/* Hadith Header Info */}
                        <div className="mb-4 pb-3 border-b border-gray-200">
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            {item?.book?.bookName && (
                              <span>
                                <span className="font-semibold">Book:</span>{" "}
                                {item.book.bookName}
                              </span>
                            )}
                            {item?.chapter && (
                              <span>
                                {" "}
                                |{" "}
                                <span className="font-semibold">
                                  Chapter:
                                </span>{" "}
                                {item?.chapter?.chapterEnglish}
                              </span>
                            )}
                            {item?.hadithNumber && (
                              <span>
                                {" "}
                                |{" "}
                                <span className="font-semibold">
                                  Hadith #:
                                </span>{" "}
                                {item?.hadithNumber}
                              </span>
                            )}
                            {item?.status && (
                              <span>
                                {" "}
                                | <span className="font-semibold">
                                  Status:
                                </span>{" "}
                                <span className="text-green-600 font-medium">
                                  {item?.status}
                                </span>
                              </span>
                            )}
                          </div>
                          {item?.englishNarrator && (
                            <div className="mt-2 text-sm text-[#157347] font-medium">
                              {item.englishNarrator}
                            </div>
                          )}
                        </div>

                        {/* Arabic Hadith Text */}
                        {item?.hadithArabic && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              Arabic Text:
                            </h4>
                            <div className="text-right font-arabic p-3 bg-gray-50 rounded-lg font-hadith text-2xl leading-12 text-green-700">
                              {item.hadithArabic}
                            </div>
                          </div>
                        )}

                        {/* English Hadith Text */}
                        {item?.hadithEnglish && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              English Translation:
                            </h4>
                            <div className="text-lg text-gray-800 leading-relaxed p-3 bg-blue-50 rounded-lg">
                              {highlightText(item.hadithEnglish, keyword)}
                            </div>
                          </div>
                        )}

                        {/* Chapter/Heading Information */}
                        {(item?.headingEnglish || item?.headingArabic) && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                              <span className="font-semibold">
                                Chapter Topic:
                              </span>
                              {item?.headingEnglish && (
                                <div className="mt-1 text-gray-700">
                                  {item.headingEnglish}
                                </div>
                              )}
                              {item?.headingArabic && (
                                <div className="mt-1 text-right font-hadith text-2xl ">
                                  {item.headingArabic}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
              </ul>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded disabled:opacity-50 hover:bg-[#2d4f73] transition-colors"
                >
                  Previous
                </button>
                <span className="font-semibold text-[#1E3A5F]">
                  Page {currentPage} of{" "}
                  {source && source.toLowerCase().includes("quran")
                    ? totalPages
                    : hadithLastPage}
                  {source && source.toLowerCase().includes("hadith") && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({hadithTotal} total results)
                    </span>
                  )}
                </span>
                <button
                  onClick={handleNext}
                  disabled={
                    source && source.toLowerCase().includes("quran")
                      ? currentPage === totalPages
                      : currentPage === hadithLastPage
                  }
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded disabled:opacity-50 hover:bg-[#2d4f73] transition-colors"
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
