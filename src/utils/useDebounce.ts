import { EventHandler, SyntheticEvent, useRef } from 'react';

const useDebounce = <T extends EventHandler<J>, J extends SyntheticEvent>(fn?: T, delay: number = 300) => {
  if (!fn) return () => null;
  if (!delay) return fn;
  const sto = useRef(setTimeout(() => null));
  const handleRun = (e?: J) => {
    if (sto.current) clearTimeout(sto.current);

    sto.current = setTimeout(() => fn(e!), delay);
  };

  return handleRun as T;
};

export default useDebounce;
