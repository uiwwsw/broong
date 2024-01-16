import { useRef } from 'react';
interface UseAnimationProps<T> {
  animate?: (params?: T) => unknown;
}
const useAnimation = <T>({ animate }: UseAnimationProps<T>) => {
  const requestRef = useRef(0);
  const startAnimation = (params?: T) => {
    animate && animate(params);
    requestRef.current = requestAnimationFrame(() => startAnimation(params));
  };
  const stopAnimation = () => cancelAnimationFrame(requestRef.current);
  return {
    startAnimation,
    stopAnimation,
  };
};

export default useAnimation;
