const PostCard = ({
  title,
  author,
  date,
  categories,
  imageUrl,
  tags,
  description,
}) => {
  console.log("image url is", imageUrl);
  return (
    <div
      className="relative bg-cover w-full h-full bg-center rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="absolute inset-0 overlay-class  "></div>
      <div className="relative flex flex-col justify-between h-full p-6 text-white">
        <div className="flex items-center justify-between text-sm">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-green-500 bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded-md"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-500 bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-2 ">{title}</h3>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
