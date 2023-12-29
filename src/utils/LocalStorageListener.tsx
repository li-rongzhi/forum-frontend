import { useEffect, useState } from 'react';
import { UserData } from '../types/UserData';


function useLocalStorageListener(key: string) {
  const [value, setValue] = useState<UserData | null>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const jsonValue = localStorage.getItem(key);
      setValue(jsonValue != null ? JSON.parse(jsonValue) : null);
    };

    // Event listener for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]); // Only re-run effect if the key changes

  return value;
}

export default useLocalStorageListener;
