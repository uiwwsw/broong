import { MouseEvent, TouchEvent, useCallback, useRef } from 'react';
interface UseHoldProps {
  onHoldBefore?: Function;
  onHoldEnd?: Function;
  onHoldStart?: Function;
  holdTime?: number;
}
const useHold = ({ onHoldEnd, onHoldStart, onHoldBefore, holdTime = 1000 }: UseHoldProps) => {
  const holdTimer = useRef(setTimeout(() => null));

  const handleStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      onHoldBefore && onHoldBefore(e);
      if (!onHoldStart) return;
      holdTimer.current = setTimeout(() => onHoldStart(), holdTime);
    },
    [onHoldStart, onHoldBefore, holdTime],
  );

  const handleStop = useCallback(() => {
    clearTimeout(holdTimer.current);
    onHoldEnd && onHoldEnd();
  }, [onHoldEnd]);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleStop,
    onMouseLeave: handleStop,
    onTouchStart: handleStart,
    onTouchEnd: handleStop,
  };
};

export default useHold;
