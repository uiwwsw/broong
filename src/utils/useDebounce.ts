import { useRef } from 'react';

const useDebounce = <T>(callback?: T, delay: number = 0) => {
  if (!delay && callback) return callback as T;
  const schedule = useRef<NodeJS.Timeout | number>();

  return <K>(param?: K) => {
    clearTimeout(schedule.current);
    schedule.current = setTimeout(() => callback instanceof Function && callback(param), delay);
  };
};
export default useDebounce;
