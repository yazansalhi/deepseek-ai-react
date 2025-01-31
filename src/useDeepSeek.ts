import { useState } from "react";
import axios from "axios";
import { useDeepSeek } from "./DeepSeekProvider";

export const useDeepSeekAPI = () => {
  const { apiKey } = useDeepSeek();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callDeepSeek = async (endpoint: string, payload: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`https://api.deepseek.com/${endpoint}`, payload, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callDeepSeek };
};
