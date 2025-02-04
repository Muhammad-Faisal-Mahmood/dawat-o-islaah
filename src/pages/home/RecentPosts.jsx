import React from "react";
import PostCard from "../../components/AppComponents/Home/PostCard";

const RecentPosts = () => {
  const posts = [
    {
      title: "The Journey of Self-Purification (Tazkiyah al-Nafs)",
      author: "Amaze Technologies",
      date: "November 1, 2024",
      categories: ["Duaen"],
      imageUrl:
        "https://th.bing.com/th/id/OIP.qGlrq4pxq0Yt6VqGMo9E6wHaHi?w=721&h=734&rs=1&pid=ImgDetMain",
      tags: ["Prayer"],
      description: "The Journey of Self-Purification.",
    },
    {
      title: "Guidelines for Ethical Behavior in Daily Life",
      author: "Amaze Technologies",
      date: "November 1, 2024",
      categories: ["Ahadith", "Duaen", "General Posts"],
      imageUrl:
        "https://th.bing.com/th/id/OIP._BFcK18zbG-T7VENqpsAKgHaHa?rs=1&pid=ImgDetMain",
      tags: ["Islaah", "Islamic", "Islamic Posts"],
      description: "Practical ethical guidelines for Muslims.",
    },
    {
      title: "Guidelines for Ethical Behavior in Daily Life",
      author: "Amaze Technologies",
      date: "November 1, 2024",
      categories: ["Ahadith", "Duaen", "General Posts"],
      imageUrl:
        "https://th.bing.com/th/id/OIP._BFcK18zbG-T7VENqpsAKgHaHa?rs=1&pid=ImgDetMain",
      tags: ["Islaah", "Islamic", "Islamic Posts"],
      description: "Practical ethical guidelines for Muslims.",
    },
    {
      title: "The Importance of Sincerity in Worship (Ikhlas)",
      author: "Amaze Technologies",
      date: "November 1, 2024",
      categories: ["Duaen"],
      imageUrl:
        "https://th.bing.com/th/id/OIP._BFcK18zbG-T7VENqpsAKgHaHa?rs=1&pid=ImgDetMain",
      tags: ["Prayer"],
      description: "Exploring sincerity in worship.",
    },

    {
      title: "Strengthening Family Bonds through Islamic Values",
      author: "Amaze Technologies",
      date: "November 1, 2024",
      categories: ["Duaen"],
      imageUrl:
        "https://th.bing.com/th/id/OIP._BFcK18zbG-T7VENqpsAKgHaHa?rs=1&pid=ImgDetMain",
      tags: ["Islamic Values"],
      description: "Enhancing family bonds through faith.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {/* First Column */}
      <div className="grid grid-rows-2 gap-6">
        {posts.slice(0, 2).map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>

      {/* Second Column */}
      <div className="row-span-2">
        <PostCard {...posts[2]} />
      </div>

      {/* Third Column */}
      <div className="grid grid-rows-2 gap-6">
        {posts.slice(3).map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
