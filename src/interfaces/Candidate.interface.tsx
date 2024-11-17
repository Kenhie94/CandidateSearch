import { createContext, useContext, useState, ReactNode } from "react";

export interface Candidate {
  login: string;
  avatar_url: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
}

interface SavedCandidatesContextType {
  savedCandidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
}

const SavedCandidatesContext = createContext<SavedCandidatesContextType | undefined>(undefined);

export const SavedCandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const addCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) => [...prev, candidate]);
  };

  return (
    <SavedCandidatesContext.Provider value={{ savedCandidates, addCandidate }}>
      {children}
    </SavedCandidatesContext.Provider>
  );
};

export const useSavedCandidates = () => {
  const context = useContext(SavedCandidatesContext);
  if (!context) {
    throw new Error("useSavedCandidates must be used within a SavedCandidatesProvider");
  }
  return context;
};
