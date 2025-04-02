import { useState, useEffect } from "react";
import { backendApiClient } from "../api/backendApi";
import { useBookContext } from "../context/BookContext";

const useIslamicBooks = (searchQuery = "", token = null) => {
  const { books, setBooks } = useBookContext();
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
  }, [searchQuery, token, setBooks]);

  return { books, loading };
};

export default useIslamicBooks;
