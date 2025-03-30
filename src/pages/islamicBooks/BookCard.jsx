const BookCard = ({
  title,
  author,
  description,
  coverImage,
  pdfFile,
  uploadedAt,
  updatedAt,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-[450px]">
      {/* Book Cover */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Book Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mt-3">{title}</h3>
        <p className="text-gray-600">By {author}</p>
        <p className="text-base text-gray-500 mt-2 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Uploaded & Updated Date */}
      <p className="text-sm text-gray-600 mt-2">
        Published: {new Date(uploadedAt).toLocaleDateString()}
      </p>

      {/* Download Button */}
      <a
        href={pdfFile}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4  text-center bg-[#1E3A5F] text-white py-2 rounded-lg 
  transition-all duration-300 ease-in-out transform hover:bg-blue-950 hover:scale-105"
      >
        Download PDF
      </a>
    </div>
  );
};

export default BookCard;
