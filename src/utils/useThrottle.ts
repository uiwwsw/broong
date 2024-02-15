import { EventHandler, SyntheticEvent, useRef } from 'react';

const useThrottle = <T extends EventHandler<J>, J extends SyntheticEvent>(fn?: T, delay: number = 300) => {
  if (!fn) return () => null;
  if (!delay) return fn;
  const sto = useRef(setTimeout(() => null));
  const handleRun = (e?: J) => {
    if (!sto.current) fn(e!);

    sto.current = setTimeout(() => (sto.current = 0), delay);
  };

  return handleRun;
};

export default useThrottle;
