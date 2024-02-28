import { useRef } from 'react';

const useDebounce = <T>(callback?: T, delay: number = 0) => {
  const schedule = useRef(0);

  return <K>(param?: K) => {
    clearTimeout(schedule.current);
    schedule.current = setTimeout(() => callback instanceof Function && callback(param), delay);
  };
};
export default useDebounce;
