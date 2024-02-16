import { useCallback, useRef } from 'react';
import useAnimation from '#/useAnimation';
interface UseHoldProps {
  onHold?: Function;
  holdTime?: number;
}
const useHold = ({ onHold, holdTime = 1000 }: UseHoldProps) => {
  const holdtimeout = useRef(setTimeout(() => null));
  const { startAnimation, stopAnimation } = useAnimation({ animate: () => onHold && onHold() });

  const handleStart = useCallback(() => {
    if (!onHold) return;
    holdtimeout.current = setTimeout(() => startAnimation(), holdTime);
  }, [onHold, holdTime]);

  const handleStop = useCallback(() => {
    clearTimeout(holdtimeout.current);
    stopAnimation();
  }, []);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleStop,
    onMouseLeave: handleStop,
    onTouchStart: handleStart,
    onTouchEnd: handleStop,
  };
};

export default useHold;
