import { useState, useEffect } from "react";
import { fetchHadith } from "../api/hadithApi";
import { useParams } from "react-router-dom";

const useHadiths = () => {
  const { bookSlug, chapterNo } = useParams();
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const getHadiths = async () => {
      try {
        const data = await fetchHadith(
          `hadiths/?book=${bookSlug}&chapter=${chapterNo}&page=${currentPage}`
        );
        if (data.status === 200) {
          setHadiths((prevHadiths) => [...prevHadiths, ...data.hadiths.data]);
          setTotalPages(data.hadiths.last_page);
        } else {
          setError("Failed to fetch Hadiths");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    };

    getHadiths();
  }, [bookSlug, chapterNo, currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setIsFetchingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return {
    hadiths,
    loading,
    error,
    loadMore,
    currentPage,
    totalPages,
    isFetchingMore,
  };
};

export default useHadiths;
