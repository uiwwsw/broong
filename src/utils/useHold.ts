import { MouseEvent, MouseEventHandler, useCallback, useRef } from 'react';
import useAnimation from '#/useAnimation';
interface UseHoldProps {
  onHold?: MouseEventHandler;
  timeout?: number;
}
const useHold = ({ onHold, timeout = 1000 }: UseHoldProps) => {
  const sti = useRef(setTimeout(() => null));
  const { startAnimation, stopAnimation } = useAnimation<MouseEvent>({ animate: (e) => e && onHold && onHold(e) });

  const handleStart = useCallback(() => {
    if (!onHold) return;
    sti.current = setTimeout(() => startAnimation(), timeout);
  }, [onHold, timeout, startAnimation]);

  const handleStop = useCallback(() => {
    clearTimeout(sti.current);
    stopAnimation();
  }, [stopAnimation]);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleStop,
    onMouseLeave: handleStop,
  };
};

export default useHold;
