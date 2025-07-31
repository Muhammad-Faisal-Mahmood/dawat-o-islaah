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

        console.log(response.data.results);

        // Transform the books data to ensure pdf_file uses HTTPS
        const transformedBooks = response.data.results.map((book) => ({
          ...book,
          pdf_file:
            book.pdf_file?.replace("http://", "https://") || book.pdf_file,
        }));

        setBooks(transformedBooks);
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
