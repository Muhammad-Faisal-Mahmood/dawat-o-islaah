import React from "react";
import { TbMathGreater } from "react-icons/tb";

const RecentPostsCard = () => {
  const recentPostsData = [
    { Title: "The Journey of Self-Purification (Tazkiyah al-Nafs)" },
    { Title: "Guidelines for Ethical Behavior in Daily Life" },
    { Title: "The Power of Dua: Connecting with Allah" },
    { Title: "Strengthening Family Bonds through Islamic Values" },
    { Title: "The Importance of Sincerity in Worship (Ikhlas)" },
  ];
  return (
    <div className="sticky top-4 bg-white shadow-lg p-6 rounded-lg">
      <div>
        <div className="item items-center flex justify-center border py-2 rounded-full w-full">
          <h3 className="text-xl font-bold ">Recent Posts</h3>
        </div>
        <ul className="list-inside space-y-2 list-none mt-5 ">
          {recentPostsData.map((post, index) => (
            <li
              key={index}
              className="flex  items-center gap-4 hover:text-green-600"
            >
              <TbMathGreater className="text-green-600" size={24} />
              {post.Title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentPostsCard;
