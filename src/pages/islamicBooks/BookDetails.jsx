import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";
import BookCard from "./BookCard";

const BookDetails = () => {
  const { bookId } = useParams();
  const { books } = useBookContext();

  const book = books.find((b) => b.id === parseInt(bookId));

  if (!book) {
    return <p className="text-center text-gray-500">Book not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BookCard
        title={book.title}
        author={book.author}
        description={book.description}
        coverImage={book.cover_image}
        pdfFile={book.pdf_file}
        uploadedAt={book.uploaded_at}
        updatedAt={book.updated_at}
      />
    </div>
  );
};

export default BookDetails;
