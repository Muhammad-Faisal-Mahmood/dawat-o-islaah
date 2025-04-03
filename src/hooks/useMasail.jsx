import { useState, useEffect } from "react";
import { backendApiClient } from "../api/backendApi";
import { useMasailContext } from "../context/MasailContext";

const useMasail = (searchQuery = "", token = null) => {
  const { masail, setMasail } = useMasailContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasails = async () => {
      setLoading(true);

      try {
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const response = await backendApiClient.get("masails", {
          params: { search: searchQuery },
          ...config,
        });

        setMasail(response.data.results);
      } catch (error) {
        console.error("Error fetching masails:", error);
      }

      setLoading(false);
    };

    fetchMasails();
  }, [searchQuery, token, setMasail]);

  return { masail, loading };
};

export default useMasail;
