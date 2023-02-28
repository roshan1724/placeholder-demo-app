import { useEffect, useState } from "react"

const getStorageData = (keyName, initialValue) => {
  const savedData = localStorage.getItem(keyName);
  const parsedValue = JSON.parse(savedData);
  return parsedValue || initialValue;
}

export const getDefaultStorageValue = (keyName) => {
  switch (keyName) {
    case 'user': {
      return {
        isLoggedIn: false,
        userInfo: null
      };
    }
    default: {
      return null;
    }
  }
}

const useLocalStorage = (keyName, initialValue) => {
  const [value, setValue] = useState(() => {
    return getStorageData(keyName, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
    console.log('Local hook ==> ', value);
  }, [keyName, value]);

  return [value, setValue];
}

export default useLocalStorage;
