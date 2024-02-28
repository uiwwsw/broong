import { useRef } from 'react';
const useThrottle = <T>(callback?: T, delay: number = 0) => {
  const schedule = useRef(0);

  return (param?: unknown): void => {
    if (!schedule.current) {
      clearTimeout(schedule.current);
      schedule.current = setTimeout(() => {
        schedule.current = 0;
        callback instanceof Function && callback(param);
      }, delay);
    }
  };
};
export default useThrottle;
