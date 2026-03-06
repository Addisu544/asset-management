// import { useState } from "react";
// import axios from "../api/axios";

// export const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<any>(null);

//   const request = async (config: any) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios(config);

//       return response.data;
//     } catch (err: any) {
//       setError(err.response?.data || "Error occurred");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { request, loading, error };
// };

import { useState, useCallback } from "react";
import axios from "../api/axios";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const request = useCallback(async (config: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios(config);

      return response.data;
    } catch (err: any) {
      setError(err.response?.data || "Error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};
