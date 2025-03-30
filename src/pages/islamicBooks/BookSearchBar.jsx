const BookSearchBar = ({ query, setQuery }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
};

export default BookSearchBar;
