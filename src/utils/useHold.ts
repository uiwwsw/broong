import { MouseEvent, TouchEvent, useCallback, useRef } from 'react';
import useAnimation from './useAnimation';
interface UseHoldProps {
  onHoldBefore?: Function;
  onHold?: Function;
  holdTime?: number;
}
const useHold = ({ onHold, onHoldBefore, holdTime = 1000 }: UseHoldProps) => {
  const holdTimer = useRef(setTimeout(() => null));
  const { startAnimation, stopAnimation } = useAnimation({ animate: onHold });

  const handleStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      onHoldBefore && onHoldBefore(e);
      if (!onHold) return;
      holdTimer.current = setTimeout(() => startAnimation(), holdTime);
    },
    [onHold, onHoldBefore, holdTime],
  );

  const handleStop = useCallback(() => {
    clearTimeout(holdTimer.current);
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
