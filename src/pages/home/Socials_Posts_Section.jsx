import React from "react";
import SocialsCard from "./SocialsCard";
import RecentPostsCard from "./RecentPostsCard";

import { FaTags, FaComments } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const postsData = [
  {
    Title: "Guidelines for Ethical Behavior in Daily Life",
    Tags: ["Ishlaah", "Islamic", "Islamic Posts"],
    Comments: [],
    Categories: ["Ahadith", "General Posts", "Duaen", "Masail", "Zikr"],
    ImgUrl:
      "https://images.squarespace-cdn.com/content/v1/5d016c1ba9f2e7000120c08c/1560579210527-7LDCZH62S91OLOJIKAE9/AdobeStock_87517185.jpeg",
    Date: "November 1,2024",
  },
  {
    Title: "Power of Dua: Connecting With Allah",
    Tags: [],
    Comments: [],
    Categories: ["Duaen"],
    ImgUrl:
      "https://img.freepik.com/premium-vector/set-arabic-calligraphy-with-name-allah_620797-112.jpg",
    Date: "November 1,2024",
  },
  {
    Title: "Strengthening Family Bonds through Islamic Values",
    Tags: [],
    Comments: [],
    Categories: ["Duaen"],
    ImgUrl:
      "https://e1.pxfuel.com/desktop-wallpaper/784/274/desktop-wallpaper-alhamdulilah-fresh-arabic-calligraphy-alhamdulillah-against-arabic-calligraphy-background.jpg",
    Date: "November 1,2024",
  },
  {
    Title: "The Importance of Sincerity in Worship (Ikhlas)",
    Tags: [],
    Comments: [],
    Categories: ["Duaen"],
    ImgUrl:
      "https://img.freepik.com/premium-vector/vector-design-islamic-arabic-calligraphy-icon-allah-muhammad_483777-181.jpg",
    Date: "November 1,2024",
  },
];

const HeroCard = () => {
  return (
    <div
      className="relative w-full h-[300px] lg:h-[400px] bg-cover bg-center my-10 rounded-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/kaaba-makkah-with-crowd-muslim-people-all-world-praying-together_1108314-282615.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute w-96 overlay-class  bottom-0 right-0 flex items-center justify-end">
        {/* Content */}
        <div className="p-8 text-white max-w-2xl">
          {/* Tag */}
          <div className="mb-4">
            <span className="uppercase text-sm text-green-400 font-bold">
              Duaen
            </span>
            <div className="w-8 h-[2px] bg-green-400 mt-1"></div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            The Journey of Self-Purification (Tazkiyah al-Nafs)
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-300 text-sm space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <MdOutlineDateRange className="text-green-300" />
              <span>November 1, 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaTags className="text-green-500" />
              <span>Prayer</span>
            </div>
          </div>

          {/* Button */}
          <button className="px-6 py-2 bg-green-400 text-white font-medium rounded-lg hover:bg-green-600">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ Title, Tags, Comments, Categories, Date, ImgUrl }) => {
  return (
    <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header Image Section */}
      <div className="relative  ">
        <img
          src={ImgUrl} // Replace with your image URL
          alt="Post Thumbnail"
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-2 overlay-class  left-2 flex gap-4  text-white text-sm px-3 py-1 rounded-full">
          {Categories.map((Category, index) => (
            <span key={index}>{Category}</span>
          ))}
        </div>
        <div className="absolute top-2 right-2 flex gap-4 text-white"></div>
      </div>

      {/* Post Content Section */}
      <div className="p-4">
        {/* Tags and Comments */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          {Tags.length > 0 && (
            <FaTags size={20} className="text-purple-500 mr-1" />
          )}
          {Tags.length > 0 && <span className="mr-4">{Tags.join(", ")}</span>}

          <FaComments size={20} className="text-blue-500 mr-1" />
          <span>{Comments.length} Comments</span>
        </div>

        {/* Post Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">{Title}</h2>

        {/* Read More and Date */}
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2 bg-green-400 hover:bg-green-600 text-white rounded-md text-sm">
            Read More
          </button>
          <div className="flex items-center text-gray-600 text-sm">
            <MdOutlineDateRange size={20} className="text-green-500 mr-1" />
            <span>{Date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollableLeftSection = () => {
  return (
    <>
      <div className="">
        <HeroCard />
        <div className="grid grid-cols-2 gap-4">
          {postsData.map((post, index) => (
            <PostCard
              key={index} // Always provide a unique key when mapping
              Title={post.Title}
              Tags={post.Tags}
              Comments={post.Comments}
              Categories={post.Categories}
              Date={post.Date}
              ImgUrl={post.ImgUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const StickyRightSection = () => {
  return (
    <div className="">
      <SocialsCard />
      <RecentPostsCard />
    </div>
  );
};

const Socials_Posts_Section = () => {
  return (
    <div className="flex gap-6 p-6 bg-gray-50">
      {/* Left Scrollable Section */}
      <div className="flex-1 overflow-hidden">
        <ScrollableLeftSection />
      </div>
      {/* Right Sticky Section */}
      <div className="w-96">
        <StickyRightSection />
      </div>
    </div>
  );
};

export default Socials_Posts_Section;
