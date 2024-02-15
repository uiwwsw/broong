import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import Smooth from './Smooth';
import Spinner from './Spinner';
import mergeClassName from '#/mergeClassName';
interface UseLoadingLayerProps {
  loading?: boolean;
  debounceTime?: number;
}
const LoadingLayer = ({ debounceTime = 500, loading: injectLoading }: UseLoadingLayerProps) => {
  const isPropsMode = injectLoading !== undefined;
  const sti = useRef(setTimeout(() => null));
  const [loading, setLoading] = useState(!!injectLoading);
  const handleClick = (e: MouseEvent) => {
    if (loading) return blockEvent(e);
    setLoading(true);
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
    <span
      className={mergeClassName(
        'absolute inset-0',
        'bg-opacity-30',
        'transition-colors',
        isPropsMode && 'pointer-events-none',
        loading && 'bg-black',
      )}
      onClick={handleClick}
      onMouseDown={blockEvent}
      onTouchStart={blockEvent}
    >
      <Smooth>{loading && <Spinner />}</Smooth>
    </span>
  );
};

export default LoadingLayer;
