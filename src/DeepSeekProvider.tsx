import React, { createContext, useContext, useState } from "react";

interface DeepSeekContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const DeepSeekContext = createContext<DeepSeekContextType | undefined>(undefined);

export const DeepSeekProvider: React.FC<{ apiKey?: string; children: React.ReactNode }> = ({ apiKey: initialKey = "", children }) => {
  const [apiKey, setApiKey] = useState<string>(initialKey);

  return (
    <DeepSeekContext.Provider value={{ apiKey, setApiKey }}>
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
