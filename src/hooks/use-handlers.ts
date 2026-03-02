import { useState, useCallback, useEffect } from "react";

export interface HandlerStats {
  totalCompounds: number;
  grossYield: number;
  feesPaid: number;
  netYield: number;
  lastCompound: number | null;
}

export interface Handler {
  address: string;
  name: string;
  vaultAddress: string;
  compoundToken: string;
  rewardToken: string;
  threshold: number;
  network: string;
  status: "active" | "paused" | "error";
  deployedAt: number;
  stats: HandlerStats;
}

const STORAGE_KEY = "compoundmax_handlers";

function loadHandlers(): Handler[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHandlers(handlers: Handler[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(handlers));
}

export function useHandlers() {
  const [handlers, setHandlers] = useState<Handler[]>(loadHandlers);

  useEffect(() => {
    saveHandlers(handlers);
  }, [handlers]);

  const addHandler = useCallback((handler: Handler) => {
    // Normalize address to lowercase
    const normalizedHandler = { ...handler, address: handler.address.toLowerCase() };
    setHandlers((prev) => [...prev, normalizedHandler]);
  }, []);

  const updateHandler = useCallback((address: string, updates: Partial<Handler>) => {
    const normalizedAddress = address.toLowerCase();
    setHandlers((prev) =>
      prev.map((h) => (h.address.toLowerCase() === normalizedAddress ? { ...h, ...updates } : h))
    );
  }, []);

  const removeHandler = useCallback((address: string) => {
    const normalizedAddress = address.toLowerCase();
    setHandlers((prev) => prev.filter((h) => h.address.toLowerCase() !== normalizedAddress));
  }, []);

  return { handlers, addHandler, updateHandler, removeHandler };
}
