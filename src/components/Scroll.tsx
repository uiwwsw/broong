import { useEffect, useRef } from 'react';
import useDebounce from '#/useDebounce';

interface ScrollProps {
  onScroll: () => Promise<unknown | boolean> | unknown;
  debounce?: number;
  infinity?: boolean;
}
const Scroll = ({ onScroll, infinity = false, debounce = 0 }: ScrollProps) => {
  const loadingRef = useRef(false);
  const handleScroll = infinity
    ? useDebounce(onScroll, debounce)
    : async () => {
        // if (!ctn) clearEvent();
        if (loadingRef.current) return;

        const { scrollY, innerHeight } = window;
        const { clientHeight } = document.body;

        if (scrollY + innerHeight >= clientHeight - 50) {
          loadingRef.current = true;
          if ((await onScroll()) === false) clearEvent();
          loadingRef.current = false;
        }
      };
  const clearEvent = () => window.removeEventListener('scroll', handleScroll);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => clearEvent();
  }, []);

  return null;
};

export default Scroll;
