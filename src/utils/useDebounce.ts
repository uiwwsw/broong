import { useRef } from 'react';

const useDebounce = <T>(fn?: (e: T) => unknown, delay: number = 300) => {
  if (!fn) return () => null;
  if (!delay) return fn;
  const sto = useRef(setTimeout(() => null));
  const handleRun = (e: T) => {
    if (sto.current) clearTimeout(sto.current);

    sto.current = setTimeout(() => fn(e), delay);
  };

  return handleRun;
};

export default useDebounce;
