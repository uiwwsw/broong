import { useRef } from 'react';

const usePreThrottle = <T>(callback?: T, delay: number = 0) => {
  const schedule = useRef(0);

  return <K>(param?: unknown): K | void => {
    if (!schedule.current) {
      clearTimeout(schedule.current);
      schedule.current = setTimeout(() => {
        schedule.current = 0;
      }, delay);
      if (callback instanceof Function) return callback(param) as K;
    }
  };
};
export default usePreThrottle;
