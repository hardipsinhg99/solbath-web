"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface SelectionItem {
  slug: string;
  name: string;
  collection: string;
  vertical: string;
}

interface SelectionContextType {
  items: SelectionItem[];
  add: (item: SelectionItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const SelectionContext = createContext<SelectionContextType | null>(null);
const STORAGE_KEY = "solbath:selection";

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {
        // ignore malformed storage
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (item: SelectionItem) => {
    setItems((prev) => (prev.some((i) => i.slug === item.slug) ? prev : [...prev, item]));
  };
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);
  const has = (slug: string) => items.some((i) => i.slug === slug);

  return (
    <SelectionContext.Provider value={{ items, add, remove, clear, has }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within a SelectionProvider");
  return ctx;
}
