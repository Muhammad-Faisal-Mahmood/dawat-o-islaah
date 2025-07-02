import { useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const ZikrOAzkar = () => {
  const { t } = useLanguage();
  const posts = [
    {
      id: 1,
      title: t("zikroazkar.1"),
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      title: t("zikroazkar.2"),
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      title: t("zikroazkar.3"),
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
    {
      id: 4,
      title: t("zikroazkar.4"),
      img: "https://th.bing.com/th/id/R.e47b67a80a0887ff74c34fe4e51d79d4?rik=Am5Ghv77z3JChA&pid=ImgRaw&r=0",
    },
  ];

  const scrollRef = useRef(null);

  return (
    <div className="bg-[#116466] text-white  hidden  px-10 sm:px-14 md:px-20 lg:px-32 py-2 md:flex items-center overflow-hidden">
      <h1 className="mr-5 bg-[#1E3A5F] rounded-md py-3 px-2 w-fit text-nowrap">
        ZIKR O AZKAAR
      </h1>
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex items-center gap-x-20 whitespace-nowrap will-change-transform"
          animate={{ x: [0, "-100%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          style={{ display: "flex" }}
        >
          {[...posts, ...posts].map((post, index) => (
            <div key={index} className="flex items-center gap-2 min-w-max">
              <img
                src={post.img}
                alt={post.title}
                className="w-10 h-10 rounded-md"
              />
              <p className="font-semibold">{post.title}</p>
            </div>
          ))}
        </motion.div>
      </div>
      {/* <div className="ml-auto flex items-center space-x-2 pl-10">
        <button className="hover:text-black p-2 rounded-full text-white bg-[#C9A227]">
          <FaArrowLeft />
        </button>
        <button className="hover:text-black p-2 rounded-full text-white bg-[#C9A227]">
          <FaArrowRight />
        </button>
      </div> */}
    </div>
  );
};

export default ZikrOAzkar;
