import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import useTheme, { WithTheme } from '#/useTheme';
import usePosition from '#/usePosition';
interface TooltipProps extends WithTheme {
  children?: ReactNode;
  slot?: ReactNode;
  timeout?: number;
}
const Tooltip = ({ slot, children, timeout = 0, componentName = 'tooltip', ...props }: TooltipProps) => {
  const theme = useTheme({ ...props, componentName });
  const ref = useRef<HTMLElement>(null);
  const sto = useRef(0);
  const { position, trigger } = usePosition({ ref });
  const adapterPosition = useMemo(() => {
    if (!position) return;
    const { innerWidth, innerHeight } = window;
    const { top, right, bottom, left } = position;
    const y = innerHeight / 2 > (bottom - top) / 2 + top;
    const x = innerWidth / 2 > (right - left) / 2 + left;
    return {
      [x ? 'left' : 'right']: x ? right : innerWidth - left,
      [y ? 'top' : 'bottom']: y ? bottom : innerHeight - top,
    };
  }, [position]);
  const [show, setShow] = useState(false);
  const handleEnter = () => {
    if (!ref.current) return;
    clearTimeout(sto.current);
    setShow(true);
    trigger();
  };
  const handleLeave = () => (sto.current = setTimeout(() => setShow(false), 500));
  useEffect(() => {
    if (!show || !timeout) return;
    const sti = setTimeout(() => setShow(false), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return (
    <i className="inline-block not-italic" ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {slot}
      {createPortal(
        <Smooth type="zoom" style={adapterPosition} className={theme}>
          {show && children}
        </Smooth>,
        document.body,
      )}
    </i>
  );
};

export default Tooltip;
