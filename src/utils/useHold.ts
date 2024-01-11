import { MouseEvent, TouchEvent, useCallback, useRef } from 'react';
interface UseHoldProps {
  onEnd?: Function;
  onStart?: Function;
  holdTime?: number;
}
const useHold = ({ onEnd, onStart, holdTime = 1000 }: UseHoldProps) => {
  const holdTimer = useRef(setTimeout(() => null));

  const handleStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      onStart && onStart(e);
      if (!onEnd) return;
      holdTimer.current = setTimeout(() => onEnd(), holdTime);
    },
    [onStart, onEnd, holdTime],
  );

  const handleStop = useCallback(() => clearTimeout(holdTimer.current), []);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleStop,
    onMouseLeave: handleStop,
    onTouchStart: handleStart,
    onTouchEnd: handleStop,
  };
};

export default useHold;
