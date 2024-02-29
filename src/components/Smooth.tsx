import clsx from 'clsx';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
interface UseSmoothProps {
  delay?: number;
  children?: ReactNode;
  className?: string;
  on?: string;
  off?: string;
  style?: CSSProperties;
  onStart?: (show: boolean) => unknown;
  onEnd?: (show: boolean) => unknown;
}
const Smooth = ({
  delay = 0,
  onStart,
  onEnd,
  children,
  className,
  on = 'animate-fade-in',
  off = 'animate-fade-out',
  ...props
}: UseSmoothProps) => {
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
      className={clsx(
        {
          'not-italic': true,
          [on]: show,
          [off]: !show,
        },
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={handleAnimationStart}
    >
      {clone}
    </i>
  );
};

export default Smooth;
