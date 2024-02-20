import { ReactNode, useEffect, useRef, useState } from 'react';
import Smooth from './Smooth';
import Spinner from './Spinner';
interface UseLoaderProps {
  children?: ReactNode;
  show?: boolean;
  timeout?: number;
  press?: string;
}
const Loader = ({ children, timeout = 500, show, press = 'onClickCapture' }: UseLoaderProps) => {
  const isPropsMode = show !== undefined;
  const sti = useRef(setTimeout(() => null));
  const [loading, setLoading] = useState(!!show);
  const handleClick = (e: Event) => {
    if (loading) return blockEvent(e);
    if (!isPropsMode) setLoading(true);
  };
  const blockEvent = (e: Event) => {
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
    <i className="relative inline-block not-italic" {...{ [press]: handleClick }}>
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
