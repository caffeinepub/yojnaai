import { create } from "zustand";
import { type Scheme, defaultSchemes } from "../data/schemes";

interface SchemesState {
  schemes: Scheme[];
  isLoading: boolean;
  setSchemes: (schemes: Scheme[]) => void;
  addScheme: (scheme: Scheme) => void;
  updateScheme: (scheme: Scheme) => void;
  deleteScheme: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

function loadFromStorage(): Scheme[] {
  try {
    const stored = localStorage.getItem("yojnaai_schemes");
    if (stored) {
      const parsed = JSON.parse(stored) as Scheme[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return defaultSchemes;
}

function saveToStorage(schemes: Scheme[]) {
  try {
    localStorage.setItem("yojnaai_schemes", JSON.stringify(schemes));
  } catch {
    // ignore
  }
}

export const useSchemesStore = create<SchemesState>((set) => ({
  schemes: loadFromStorage(),
  isLoading: false,
  setSchemes: (schemes) => {
    saveToStorage(schemes);
    set({ schemes });
  },
  addScheme: (scheme) =>
    set((state) => {
      const schemes = [...state.schemes, scheme];
      saveToStorage(schemes);
      return { schemes };
    }),
  updateScheme: (scheme) =>
    set((state) => {
      const schemes = state.schemes.map((s) =>
        s.id === scheme.id ? scheme : s,
      );
      saveToStorage(schemes);
      return { schemes };
    }),
  deleteScheme: (id) =>
    set((state) => {
      const schemes = state.schemes.filter((s) => s.id !== id);
      saveToStorage(schemes);
      return { schemes };
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
