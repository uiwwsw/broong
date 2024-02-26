import { MouseEvent, useCallback, useRef } from 'react';
import useAnimation from '#/useAnimation';
interface UseHoldProps {
  onHold?: () => unknown;
  timeout?: number;
}
const useHold = ({ onHold, timeout = 1000 }: UseHoldProps) => {
  const sti = useRef(setTimeout(() => null));
  const { startAnimation, stopAnimation } = useAnimation({ animate: onHold });

  const handleStart = useCallback(
    (e: MouseEvent) => {
      if (!onHold) return;
      sti.current = setTimeout(() => startAnimation(e), timeout);
    },
    [onHold, timeout, startAnimation],
  );

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
