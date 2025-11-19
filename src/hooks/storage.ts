import { useState, useEffect, useCallback } from "react";

type StorageValue<T> = T | null;

interface UseStorageReturn<T> {
  value: StorageValue<T>;
  set: (value: T) => void;
  remove: () => void;
  update: (updater: (prev: StorageValue<T>) => T) => void;
}

export function useStorage<T>(
  key: string,
  initialValue?: T
): UseStorageReturn<T> {
  const [value, setValue] = useState<StorageValue<T>>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue ?? null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue ?? null;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue) as T);
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        setValue(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const set = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  const update = useCallback(
    (updater: (prev: StorageValue<T>) => T) => {
      try {
        const newValue = updater(value);
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.error(`Error updating localStorage key "${key}":`, error);
      }
    },
    [key, value]
  );

  return { value, set, remove, update };
}

// Helper hook for string values
export function useStorageString(
  key: string,
  initialValue?: string
): UseStorageReturn<string> {
  return useStorage<string>(key, initialValue);
}

// Helper hook for boolean values
export function useStorageBoolean(
  key: string,
  initialValue?: boolean
): UseStorageReturn<boolean> {
  return useStorage<boolean>(key, initialValue);
}

// Helper hook for number values
export function useStorageNumber(
  key: string,
  initialValue?: number
): UseStorageReturn<number> {
  return useStorage<number>(key, initialValue);
}

// Session Storage Hook
export function useSessionStorage<T>(
  key: string,
  initialValue?: T
): UseStorageReturn<T> {
  const [value, setValue] = useState<StorageValue<T>>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue ?? null;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue ?? null;
    }
  });

  const set = useCallback(
    (newValue: T) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key]);

  const update = useCallback(
    (updater: (prev: StorageValue<T>) => T) => {
      try {
        const newValue = updater(value);
        sessionStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.error(`Error updating sessionStorage key "${key}":`, error);
      }
    },
    [key, value]
  );

  return { value, set, remove, update };
}

// Static utility functions for direct localStorage operations
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  },

  keys: (): string[] => {
    return Object.keys(localStorage);
  },
};

// Static utility functions for direct sessionStorage operations
export const sessionStore = {
  get: <T>(key: string): T | null => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },

  has: (key: string): boolean => {
    return sessionStorage.getItem(key) !== null;
  },

  keys: (): string[] => {
    return Object.keys(sessionStorage);
  },
};
