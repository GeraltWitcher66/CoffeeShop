'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'cafedan-favorites';

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setIds(parsed.filter((id) => typeof id === 'string'));
      }
    } catch {
      // ignore broken storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage may be unavailable
    }
  }, [ids, isHydrated]);

  useEffect(() => {
    function syncFromOtherTabs(event) {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (Array.isArray(parsed)) setIds(parsed);
      } catch {
        // ignore malformed values
      }
    }

    window.addEventListener('storage', syncFromOtherTabs);
    return () => window.removeEventListener('storage', syncFromOtherTabs);
  }, []);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite: (id) =>
        setIds((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        ),
    }),
    [ids]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return context;
}
