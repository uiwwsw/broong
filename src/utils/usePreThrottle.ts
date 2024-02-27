import { useCallback, useRef } from 'react';

const usePreThrottle = () => {
  const schedule = useRef(0);

  return useCallback(
    <T>(callback?: T, delay: number = 0) =>
      <K>(param?: unknown): K | void => {
        if (!schedule.current) {
          clearTimeout(schedule.current);
          schedule.current = setTimeout(() => {
            schedule.current = 0;
          }, delay);
          if (callback instanceof Function) return callback(param) as K;
        }
      },
    [],
  );
};
export default usePreThrottle;
