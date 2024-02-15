import { useRef } from 'react';

const useThrottle = <T>(fn?: (e: T) => unknown, delay: number = 300) => {
  if (!fn) return () => null;
  if (!delay) return fn;
  const sto = useRef(0);
  const handleRun = (e: T) => {
    if (!sto.current) fn(e);

    sto.current = setTimeout(() => (sto.current = 0), delay);
  };

  return handleRun;
};

export default useThrottle;
