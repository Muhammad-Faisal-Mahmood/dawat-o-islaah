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
    {
      id: 4,
      title: "The Journey of Self Purification (Tazkiyah al-Nafs)",
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
    <div className="bg-[#116466] text-white  px-3 hidden md:px-12 py-2 md:flex items-center overflow-hidden">
      <h1 className="mr-5  bg-[#1E3A5F] rounded-md py-3 px-2  w-fit text-nowrap">
        ZIKR O AZKAAR
      </h1>

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
        <button className=" hover:text-black p-2 rounded-full text-white bg-[#C9A227] ">
          <FaArrowLeft />
        </button>
        <button className="hover:text-black p-2 rounded-full text-white bg-[#C9A227] ">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ZikrOAzkar;
