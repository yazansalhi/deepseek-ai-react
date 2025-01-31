import * as React from "react";
import DeepSeek from "./DeepSeek";

const { createContext, useContext, useState } = React;

interface DeepSeekContextType {
  client: DeepSeek | null;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
}

const DeepSeekContext = createContext<DeepSeekContextType | undefined>(undefined);

export const DeepSeekProvider: React.FC<{ apiKey?: string; model?: string; baseURL?: string; children: React.ReactNode }> = ({
  apiKey = "",
  model = "deepseek-chat-v2",
  baseURL = "https://api.deepseek.com",
  children
}) => {
  const [client, setClient] = useState<DeepSeek | null>(apiKey ? new DeepSeek(apiKey, baseURL) : null);
  const [selectedModel, setModel] = useState<string>(model);

  const setApiKey = (newApiKey: string) => {
    setClient(new DeepSeek(newApiKey, baseURL));
  };

  return (
    <DeepSeekContext.Provider value={{ client, setApiKey, model: selectedModel, setModel }}>
      {children}
    </DeepSeekContext.Provider>
  );
};

export const useDeepSeek = () => {
  const context = useContext(DeepSeekContext);
  if (!context) {
    throw new Error("useDeepSeek must be used within a DeepSeekProvider");
  }
  return context;
};
