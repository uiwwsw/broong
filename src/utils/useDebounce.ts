import { EventHandler, useRef } from 'react';

const useDebounce = <T extends EventHandler<any>>(fn?: T, delay: number = 300) => {
  if (!fn) return () => null;
  if (!delay) return fn;
  const sto = useRef(setTimeout(() => null));
  const handleRun = (e?: unknown) => {
    if (sto.current) clearTimeout(sto.current);

    sto.current = setTimeout(() => fn(e), delay);
  };

  return handleRun;
};

export default useDebounce;
