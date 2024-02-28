import { useRef } from 'react';

const usePreDebounce = <T>(callback?: T, delay: number = 0) => {
  const schedule = useRef(0);

  return <K>(param?: unknown): K | void => {
    clearTimeout(schedule.current);
    schedule.current = setTimeout(() => (schedule.current = 0), delay);
    if (!schedule.current && callback instanceof Function) return callback(param);
  };
};
export default usePreDebounce;
