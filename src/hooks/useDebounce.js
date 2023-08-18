import { useEffect, useState } from "react";

/**
 * Custom Hook to implement debounce
 * @param {string | any} value
 * @param {number} milliseconds
 * @returns {string}
 */
export const useDebounce = (value, milliseconds) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, milliseconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliseconds]);

  return debounceValue;
};
