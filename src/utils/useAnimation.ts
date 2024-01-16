import { useRef } from 'react';
interface UseAnimationProps {
  animate?: Function;
}
const useAnimation = ({ animate }: UseAnimationProps) => {
  const requestRef = useRef(0);
  const startAnimation = () => {
    animate && animate();
    requestRef.current = requestAnimationFrame(startAnimation);
  };
  const stopAnimation = () => cancelAnimationFrame(requestRef.current);
  return {
    startAnimation,
    stopAnimation,
  };
};

export default useAnimation;
