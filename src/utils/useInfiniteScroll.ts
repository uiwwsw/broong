import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  event: () => Promise<unknown | boolean>;
}
const InfiniteScroll = ({ event }: InfiniteScrollProps) => {
  const loadingRef = useRef(false);
  const handleScroll = async () => {
    // if (!ctn) clearEvent();
    if (loadingRef.current) return;

    const { scrollY, innerHeight } = window;
    const { clientHeight } = document.body;

    if (scrollY + innerHeight >= clientHeight - 50) {
      loadingRef.current = true;
      if ((await event()) === false) clearEvent();
      loadingRef.current = false;
    }
  };
  const clearEvent = () => window.removeEventListener('scroll', handleScroll);
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => clearEvent();
  }, []);
};

export default InfiniteScroll;
