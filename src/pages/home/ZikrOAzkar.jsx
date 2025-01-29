import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ZikrOAzkar = () => {
  const posts = [
    {
      id: 1,
      title: "The Power of Dua: Connecting with Allah",
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      title: "Strengthening Family Bonds through Islamic Values",
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      title: "The Importance of Sincerity in Worship (Ikhlas)",
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
  ];

  const tickerRef = useRef(null);

  useEffect(() => {
    const scrollTicker = () => {
      if (tickerRef.current) {
        tickerRef.current.scrollLeft += 2;

        // If scrolled more than half, reset scroll position seamlessly
        if (tickerRef.current.scrollLeft >= tickerRef.current.scrollWidth / 2) {
          tickerRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scrollTicker, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white  p-2 flex items-center overflow-hidden">
      <div className="text-center  bg-gradient-to-r from-green-400 to-lime-400 text-white px-10 text-lg py-2 rounded-lg font-bold mr-4">
        ZIKR O AZKAAR
      </div>
      <div
        ref={tickerRef}
        className="flex items-center gap-x-20 overflow-x-auto hide-scrollbar  whitespace-nowrap"
        style={{ scrollBehavior: "smooth" }}
      >
        {[...posts, ...posts].map((post, index) => (
          <div key={index} className="flex items-center gap-2">
            <img
              src={post.img}
              alt={post.title}
              className="w-10 h-10 rounded-md"
            />
            <p className="font-semibold">{post.title}</p>
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-2 pl-10">
        <button className="hover:bg-green-600 hover:text-white p-2 rounded-full text-black bg-white border">
          <FaArrowLeft />
        </button>
        <button className="hover:bg-green-600 hover:text-white p-2 rounded-full text-black bg-white border">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ZikrOAzkar;
