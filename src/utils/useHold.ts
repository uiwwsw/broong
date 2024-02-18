import { useCallback, useRef } from 'react';
import useAnimation from '#/useAnimation';
interface UseHoldProps {
  onHold?: Function;
  timeout?: number;
}
const useHold = ({ onHold, timeout = 1000 }: UseHoldProps) => {
  const sti = useRef(setTimeout(() => null));
  const { startAnimation, stopAnimation } = useAnimation({ animate: () => onHold && onHold() });

  const handleStart = useCallback(() => {
    if (!onHold) return;
    sti.current = setTimeout(() => startAnimation(), timeout);
  }, [onHold, timeout]);

  const handleStop = useCallback(() => {
    clearTimeout(sti.current);
    stopAnimation();
  }, []);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleStop,
    onMouseLeave: handleStop,
  };
};

export default useHold;
