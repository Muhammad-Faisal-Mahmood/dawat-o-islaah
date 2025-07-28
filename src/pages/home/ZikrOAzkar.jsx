import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import useBlogs from "../../hooks/useBlogs";

const ZikrOAzkar = () => {
  const { t } = useLanguage();
  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs();
  const scrollRef = useRef(null);

  const validBlogs = blogs?.filter((blog) => blog.title && blog.featured_image);

  return (
    <div className="bg-[#116466] text-white hidden px-10 sm:px-14 md:px-20 lg:px-32 py-2 md:flex items-center overflow-hidden">
      <h1 className="mr-5 bg-[#1E3A5F] rounded-md py-3 px-2 w-fit text-nowrap">
        ZIKR O AZKAAR
      </h1>
      <div className="relative w-full overflow-hidden">
        {blogsLoading ? (
          <div className="text-white text-sm">Loading...</div>
        ) : (
          <div className="flex">
            <motion.div
              className="flex items-center whitespace-nowrap will-change-transform "
              animate={{ x: [0, "-100%"] }}
              transition={{
                ease: "linear",
                duration: validBlogs?.length ? validBlogs.length * 5 : 30,
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ display: "flex" }}
            >
              {[...validBlogs, ...validBlogs, ...validBlogs]?.map(
                (blog, index) => (
                  <div
                    key={`set1-${index}`}
                    className="flex items-center gap-2 min-w-max"
                  >
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-10 h-10 rounded-md"
                    />
                    <p className="pr-10">{blog.title}</p>
                  </div>
                )
              )}
            </motion.div>

            <motion.div
              className="flex items-center whitespace-nowrap will-change-transform "
              animate={{ x: [0, "-100%"] }}
              transition={{
                ease: "linear",
                duration: validBlogs?.length ? validBlogs.length * 5 : 30,
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ display: "flex" }}
            >
              {[...validBlogs, ...validBlogs, ...validBlogs]?.map(
                (blog, index) => (
                  <div
                    key={`set2-${index}`}
                    className="flex items-center gap-2 min-w-max "
                  >
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-10 h-10 rounded-md"
                    />
                    <p className="pr-10">{blog.title}</p>
                  </div>
                )
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZikrOAzkar;
