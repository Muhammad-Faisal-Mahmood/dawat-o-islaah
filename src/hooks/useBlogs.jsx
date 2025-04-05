import { useEffect, useState } from "react";
import { backendApiClient } from "../api/backendApi";
import { useBlogContext } from "../context/BlogContext";

const useBlogs = () => {
  const { blog, setBlog } = useBlogContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await backendApiClient.get("blogs");
        setBlog(response.data?.results || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [setBlog]);

  return { blogs: blog, loading, error };
};

export default useBlogs;
