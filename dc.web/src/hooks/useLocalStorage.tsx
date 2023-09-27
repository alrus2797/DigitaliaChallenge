import { useState } from "react";

export const useLocalStorage = <T,>(keyName: string, defaultValue: T | null) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      console.log('useLocalStorage', keyName, value)
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const refreshValue = () => {
    try {
      return window.localStorage.getItem(keyName);
    } catch (err) {
      return defaultValue;
    }
  };


  const setValue = (newValue: T | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return {storedValue, setValue, refreshValue};
};