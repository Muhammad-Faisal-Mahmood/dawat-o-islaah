import { useState, useEffect } from "react";
import { backendApiClient } from "../api/backendApi";

const useIslamicBooks = (searchQuery = "", token = null) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const response = await backendApiClient.get("books/", {
          params: { search: searchQuery },
          ...config,
        });

        setBooks(response.data.results);
      } catch (error) {
        console.error("Error fetching books:", error);
      }

      setLoading(false);
    };

    fetchBooks();
  }, [searchQuery, token]);

  return { books, loading };
};

export default useIslamicBooks;
