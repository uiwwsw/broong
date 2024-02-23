import mergeClassName from '#/mergeClassName';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
interface UseSmoothProps {
  children?: ReactNode;
  className?: string;
  type?: 'fade' | 'drop' | 'zoom';
  style?: CSSProperties;
  onStart?: (show: boolean) => unknown;
  onEnd?: (show: boolean) => unknown;
}
const Smooth = ({ onStart, onEnd, children, className, type = 'fade', ...props }: UseSmoothProps) => {
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
  useEffect(() => {
    if (!children) return setShow(false);

    setClone(children);
    setHide(false);
    setShow(true);
  }, [children]);
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
