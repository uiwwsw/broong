import mergeClassName from '#/mergeClassName';
import { ReactElement, useEffect, useState } from 'react';
interface UseSmoothProps {
  children?: ReactElement | false | null;
  className?: string;
}
const Smooth = ({ children, className }: UseSmoothProps) => {
  const [show, setShow] = useState(false);
  const [clone, setClone] = useState(children);
  const [hide, setHide] = useState(false);
  const handleAnimationEnd = () => {
    if (!show) setHide(true);
  };
  useEffect(() => {
    if (!children) return setShow(false);

    setClone(children);
    setHide(false);
    setShow(true);
  }, [children]);
  return hide ? null : (
    <div
      className={mergeClassName('opacity-0', show ? 'animate-fade-in' : 'animate-fade-out', className)}
      style={{ opacity: show ? 1 : 0 }}
      onAnimationEnd={handleAnimationEnd}
    >
      {clone}
    </div>
  );
};

export default Smooth;
