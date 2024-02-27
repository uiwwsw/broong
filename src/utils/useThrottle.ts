import { useCallback, useRef } from 'react';

const useDebounce = () => {
  const schedule = useRef(0);

  return useCallback(
    <T>(callback?: T, delay: number = 0) =>
      (param?: unknown): void => {
        if (!schedule.current) {
          clearTimeout(schedule.current);
          schedule.current = setTimeout(() => {
            callback instanceof Function && callback(param);
            schedule.current = 0;
          }, delay);
        }
      },
    [],
  );
};
export default useDebounce;
