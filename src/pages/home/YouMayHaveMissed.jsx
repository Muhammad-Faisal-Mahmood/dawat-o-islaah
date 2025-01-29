import React from "react";
const PostCard = ({ image, tag, title, date, author, tags }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image} // Replace with dynamic image URL
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {tag}
        </div>
        {tags && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-x-3 gap-y-2 ml-3">
            {tags.map((t, index) => (
              <span
                key={index}
                className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {title.length > 40 ? title.substring(0, 40) + "..." : title}
        </h3>
        <p className="text-sm text-green-500 mb-1">{date}</p>
        <p className="text-sm text-gray-500">{author}</p>
      </div>
    </div>
  );
};

const YouMayHaveMissed = () => {
  const posts = [
    {
      image:
        "https://cdn.britannica.com/89/94689-050-4C424297/shahadah-call-lines-prayer-Islamic-mosque-calligraphy.jpg",
      tag: "DUAEN",
      title: "Strengthening Family Bonds through Islamic Values",
      date: "November 1, 2024",
      author: "Amaze Technologies",
    },
    {
      image:
        "https://cdn.britannica.com/89/94689-050-4C424297/shahadah-call-lines-prayer-Islamic-mosque-calligraphy.jpg",
      tag: "DUAEN",
      title: "The Importance of Sincerity in Worship",
      date: "November 1, 2024",
      author: "Amaze Technologies",
    },
    {
      image:
        "https://cdn.britannica.com/89/94689-050-4C424297/shahadah-call-lines-prayer-Islamic-mosque-calligraphy.jpg",
      tag: "DUAEN",
      title: "The Journey of Self-Purification (Tazkiyah al-Nafs)",
      date: "November 1, 2024",
      author: "Amaze Technologies",
    },
    {
      image:
        "https://cdn.britannica.com/89/94689-050-4C424297/shahadah-call-lines-prayer-Islamic-mosque-calligraphy.jpg",
      tag: "AHADITH",
      title: "Guidelines for Ethical Behavior in Daily Life",
      date: "November 1, 2024",
      author: "Amaze Technologies",
      tags: ["AHADITH", "DUAEN", "GENERAL POSTS", "MASAIL", "ZIKR"],
    },
  ];

  return (
    <div className="p-8">
      <div className="border border-l-6 border-r-6 border-green-600 w-fit flex items-center justify-center mb-8 px-5 py-2 rounded-full ">
        <h2 className="text-2xl font-bold  ">You May Have Missed</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default YouMayHaveMissed;
