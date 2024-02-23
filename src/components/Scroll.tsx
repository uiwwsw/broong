import { useCallback, useEffect, useRef } from 'react';
import useDebounce from '#/useDebounce';

interface ScrollProps {
  onScroll: () => Promise<unknown | boolean> | unknown;
  debounce?: number;
  infinity?: boolean;
}
const Scroll = ({ onScroll, infinity = false, debounce = 0 }: ScrollProps) => {
  const loadingRef = useRef(false);
  const debounceScroll = useDebounce<unknown>(onScroll, debounce);
  const handleScroll = useCallback(async () => {
    if (infinity) return debounceScroll(undefined);
    // if (!ctn) clearEvent();
    if (loadingRef.current) return;

    const { scrollY, innerHeight } = window;
    const { offsetHeight } = document.body;
    console.log(scrollY, innerHeight, offsetHeight - 50);

    if (scrollY + innerHeight >= offsetHeight - 50) {
      loadingRef.current = true;
      if ((await debounceScroll(undefined)) === false) window.removeEventListener('scroll', handleScroll);
      loadingRef.current = false;
    }
  }, [debounceScroll, infinity]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return null;
};

export default Scroll;
