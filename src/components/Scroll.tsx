import { useCallback, useEffect, useRef } from 'react';
import usePreThrottle from '#/usePreThrottle';

interface ScrollProps {
  onScroll: () => Promise<unknown | boolean> | unknown;
  throttle?: number;
  infinity?: boolean;
}
const Scroll = ({ onScroll, infinity = false, throttle = 0 }: ScrollProps) => {
  const loadingRef = useRef(false);
  const throttleScroll = usePreThrottle(onScroll, throttle);
  const handleScroll = useCallback(async () => {
    if (infinity) return throttleScroll(undefined);
    // if (!ctn) clearEvent();
    if (loadingRef.current) return;

    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.body;

    if (scrollY + innerHeight >= scrollHeight - 50) {
      loadingRef.current = true;
      if ((await throttleScroll()) === false) window.removeEventListener('scroll', handleScroll);
      loadingRef.current = false;
    }
  }, [throttleScroll, infinity]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return null;
};

export default Scroll;
