import { useRef } from 'react';

const useDebounce = <T>(fn?: (e: T) => unknown, delay: number = 300) => {
  if (!fn) return () => null;
  const sto = useRef(setTimeout(() => null));
  const handleRun = (e: T) => {
    if (sto.current) clearTimeout(sto.current);

    sto.current = setTimeout(async () => {
      return await fn(e);
    }, delay);
  };

  return handleRun;
};

export default useDebounce;
