import { useEffect } from 'react';
import useDebounce from './useDebounce';
interface ScrollProps {
  onScroll?: (event?: Event) => void;
  debounce: number;
}
const Scroll = ({ onScroll, debounce = 300 }: ScrollProps) => {
  const handleScroll = useDebounce(onScroll, debounce);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return null;
};

export default Scroll;
