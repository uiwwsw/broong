import { MouseEvent, ReactNode, TouchEvent, useEffect, useRef, useState } from 'react';
import Smooth from './Smooth';
import Spinner from './Spinner';
interface UseLoaderProps {
  children?: ReactNode;
  show?: boolean;
  timeout?: number;
}
const Loader = ({ children, timeout = 500, show }: UseLoaderProps) => {
  const isPropsMode = show !== undefined;
  const sti = useRef(setTimeout(() => null));
  const [loading, setLoading] = useState(!!show);
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
    return;
  };
  useEffect(() => {
    if (isPropsMode) {
      setLoading(show);
    } else if (loading) {
      clearTimeout(sti.current);
      sti.current = setTimeout(() => setLoading(false), timeout);
    }
  }, [loading, show]);
  return (
    <i
      className="relative inline-block"
      onClickCapture={handleClick}
      onMouseDownCapture={handleStart}
      onTouchStartCapture={handleStart}
    >
      {children}

      <Smooth className="w-0">
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
