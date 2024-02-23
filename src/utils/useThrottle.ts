import { useRef } from 'react';

const useThrottle = <T>(fn?: (e: T) => unknown, delay: number = 300) => {
  const sto = useRef(0);
  if (!fn) return () => null;
  if (!delay) return fn;
  const handleRun = (e: T) => {
    if (!sto.current) {
      clearTimeout(sto.current);
      sto.current = setTimeout(() => {
        fn(e);
        sto.current = 0;
      }, delay);
    }
  };

  return handleRun;
};

export default useThrottle;
