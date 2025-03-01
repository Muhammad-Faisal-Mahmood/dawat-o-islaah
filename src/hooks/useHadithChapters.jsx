import { useState, useEffect } from "react";
import { fetchHadith } from "../api/hadithApi";
import { useParams } from "react-router-dom";

const useHadithChapters = () => {
  const { bookSlug } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChapters = async () => {
      try {
        const data = await fetchHadith(`${bookSlug}/chapters`);
        if (data.status === 200) {
          setChapters(data.chapters);
        } else {
          setError("Failed to fetch chapters");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getChapters();
  }, [bookSlug]);

  return { chapters, loading, error };
};

export default useHadithChapters;
