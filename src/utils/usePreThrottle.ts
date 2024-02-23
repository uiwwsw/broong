import { useRef } from 'react';

const usePreThrottle = <T>(fn?: (e: T) => unknown, delay: number = 300) => {
  const sto = useRef(0);
  if (!fn) return () => null;
  if (!delay) return fn;
  const handleRun = (e: T) => {
    if (!sto.current) {
      fn(e);
      clearTimeout(sto.current);
      sto.current = setTimeout(() => {
        sto.current = 0;
      }, delay);
    }
  };

  return handleRun;
};

export default usePreThrottle;
