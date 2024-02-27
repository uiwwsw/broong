import { useCallback, useRef } from 'react';

const useDebounce = () => {
  const schedule = useRef(0);

  return useCallback(
    <T>(callback?: T, delay: number = 0) =>
      <K>(param?: unknown): K | void => {
        clearTimeout(schedule.current);
        schedule.current = setTimeout(() => (schedule.current = 0), delay);
        if (!schedule.current && callback instanceof Function) return callback(param);
      },
    [],
  );
};
export default useDebounce;
