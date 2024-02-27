import { useCallback, useRef } from 'react';

const useDebounce = () => {
  const schedule = useRef(0);

  return useCallback(
    <T>(callback?: T, delay: number = 0) =>
      (param?: unknown) => {
        clearTimeout(schedule.current);
        schedule.current = setTimeout(() => callback instanceof Function && callback(param), delay);
      },
    [],
  );
};
export default useDebounce;
