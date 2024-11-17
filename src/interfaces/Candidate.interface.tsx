import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Candidate {
  login: string;
  avatar_url: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
}

// Create an interface for the functionality buttons
interface SavedCandidatesContextType {
  savedCandidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (login: string) => void; 
}

const SavedCandidatesContext = createContext<SavedCandidatesContextType | undefined>(undefined);

export const SavedCandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage when the provider initializes
  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Save candidates to local storage whenever the state updates
  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const addCandidate = (candidate: Candidate) => {
    // Avoid adding duplicate candidates
    setSavedCandidates((prev) => {
      if (prev.some((c) => c.login === candidate.login)) {
        return prev; // Candidate already exists
      }
      return [...prev, candidate];
    });
  };

  const removeCandidate = (login: string) => {
    // Remove candidate by login and update state
    setSavedCandidates((prev) => prev.filter((candidate) => candidate.login !== login));
  };

  return (
    <SavedCandidatesContext.Provider value={{ savedCandidates, addCandidate, removeCandidate }}>
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
