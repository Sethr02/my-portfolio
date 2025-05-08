import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [keys, setKeys] = useState([]);
  const [isKonamiCode, setIsKonamiCode] = useState(false);

  const handleKeyDown = useCallback(({ key }) => {
    const newKeys = [...keys, key.toLowerCase()];
    setKeys(newKeys);

    const isMatch = KONAMI_CODE.every(
      (code, index) => code.toLowerCase() === newKeys[index]
    );

    if (isMatch && newKeys.length === KONAMI_CODE.length) {
      setIsKonamiCode(true);
      setKeys([]);
    }

    if (newKeys.length >= KONAMI_CODE.length && !isMatch) {
      setKeys(newKeys.slice(1));
    }
  }, [keys]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return [isKonamiCode, setIsKonamiCode];
};
