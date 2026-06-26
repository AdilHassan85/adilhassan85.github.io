import React, { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";
import Terminal from "../components/Terminal";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setLoading] = useState(0);
  const [terminalDone, setTerminalDone] = useState(false);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading />}
      {!isLoading && !terminalDone && (
        <Terminal onComplete={() => setTerminalDone(true)} />
      )}
      <main className="main-body">
        {!isLoading && terminalDone && children}
      </main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};