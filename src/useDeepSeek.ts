import { useState } from "react";
import { useDeepSeek } from "./DeepSeekProvider";

export const useDeepSeekAPI = () => {
  const { client } = useDeepSeek();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callDeepSeek = async (method: "chatCompletion" | "edit" | "search", params: any) => {
    if (!client) {
      setError("API client is not initialized");
      return;
    }

    setLoading(true);
    try {
      let result;
      switch (method) {
        case "chatCompletion":
          result = await client.chatCompletion(params.messages, params.model);
          break;
        case "edit":
          result = await client.edit(params.input, params.instruction);
          break;
        case "search":
          result = await client.search(params.query);
          break;
        default:
          throw new Error("Invalid method");
      }
  
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callDeepSeek };
};
