import { MouseEvent, ReactNode, TouchEvent, useEffect, useRef, useState } from 'react';
import Smooth from './Smooth';
import Spinner from './Spinner';
interface UseLoaderProps {
  children?: ReactNode;
  loading?: boolean;
  debounceTime?: number;
}
const Loader = ({ children, debounceTime = 500, loading: injectLoading }: UseLoaderProps) => {
  const isPropsMode = injectLoading !== undefined;
  const sti = useRef(setTimeout(() => null));
  const [loading, setLoading] = useState(!!injectLoading);
  const handleClick = (e: MouseEvent) => {
    if (loading) return blockEvent(e);
    if (!isPropsMode) setLoading(true);
  };
  const handleStart = (e: MouseEvent | TouchEvent) => {
    if (loading) return blockEvent(e);
  };
  const blockEvent = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    if (isPropsMode) {
      setLoading(injectLoading);
    } else if (loading) {
      clearTimeout(sti.current);
      sti.current = setTimeout(() => setLoading(false), debounceTime);
    }
  }, [loading, injectLoading]);
  return (
    <i
      className="relative inline-block"
      onClickCapture={handleClick}
      onMouseDownCapture={handleStart}
      onTouchStartCapture={handleStart}
    >
      {children}

      <Smooth>
        {loading && (
          <i className="absolute inset-0 bg-black bg-opacity-30 transition-colors">
            <Spinner />
          </i>
        )}
      </Smooth>
    </i>
  );
};

export default Loader;
