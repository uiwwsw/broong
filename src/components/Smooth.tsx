import mergeClassName from '#/mergeClassName';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
interface UseSmoothProps {
  delay?: number;
  children?: ReactNode;
  className?: string;
  type?: string;
  style?: CSSProperties;
  onStart?: (show: boolean) => unknown;
  onEnd?: (show: boolean) => unknown;
}
const Smooth = ({ delay = 0, onStart, onEnd, children, className, type = 'fade', ...props }: UseSmoothProps) => {
  const [show, setShow] = useState(false);
  const [clone, setClone] = useState(children);
  const [hide, setHide] = useState(true);
  const handleAnimationStart = () => {
    onStart && onStart(show);
  };
  const handleAnimationEnd = () => {
    onEnd && onEnd(show);
    if (!show) setHide(true);
  };
  const init = () => {
    setHide(false);
    setShow(true);
  };
  useEffect(() => {
    if (!children) return setShow(false);
    setClone(children);
    const sto = setTimeout(init, delay);
    return () => clearTimeout(sto);
  }, [children, delay]);
  return hide ? null : (
    <i
      {...props}
      className={mergeClassName(type, `${type}--${show ? 'in' : 'out'}`, className, 'not-italic')}
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
    >
      {clone}
    </i>
  );
};

export default Smooth;
