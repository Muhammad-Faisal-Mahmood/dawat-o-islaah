import { useState } from "react";
import { Link } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const BookCard = ({
  title,
  author,
  description,
  coverImage,
  pdfFile,
  uploadedAt,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link to={id ? `/islamicBooks/${id}` : "#"}>
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

          {/* Uploaded Date */}
          <p className="text-sm text-gray-600 mt-2">
            Published: {new Date(uploadedAt).toLocaleDateString()}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            {/* Download Button */}
            <a
              href={pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-[#1E3A5F] text-white py-2 rounded-lg 
              transition-all duration-300 ease-in-out transform hover:bg-blue-950 hover:scale-105"
            >
              Download PDF
            </a>

            {/* Read Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
              className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg
              transition-all duration-300 ease-in-out transform hover:bg-green-800 hover:scale-105"
            >
              Read
            </button>
          </div>
        </div>
      </Link>

      {/* PDF Viewer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full h-full md:w-4/5 md:h-4/5 bg-white rounded-lg overflow-hidden flex flex-col">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfFile}
                  defaultScale={1.0}
                  renderError={(error) => (
                    <div className="flex flex-col items-center justify-center h-full text-red-500 p-4">
                      <p>Failed to load PDF: {error.message}</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Close
                      </button>
                    </div>
                  )}
                  renderLoader={() => (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
