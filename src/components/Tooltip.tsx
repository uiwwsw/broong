import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import { WithTheme } from '#/theme';
import usePosition from '#/usePosition';
import clsx from 'clsx';
interface TooltipProps extends WithTheme {
  children?: ReactNode;
  slot?: ReactNode;
  timeout?: number;
}
const Tooltip = ({ slot, children, timeout = 0, themeColor = 'primary', themeSize = 'md' }: TooltipProps) => {
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
        <Smooth
          on="animate-tooltip-in"
          off="animate-tooltip-out"
          style={adapterPosition}
          className={clsx({
            'fixed z-50 px-2 py-1 text-xs font-thin after:absolute after:h-3 after:w-3 after:skew-x-12 after:bg-inherit':
              true,
            'origin-top-left after:left-0 after:top-0 after:rotate-6': adapterPosition?.top && adapterPosition?.left,
            'origin-top-right after:right-0 after:top-0 after:rotate-[-84deg]':
              adapterPosition?.top && adapterPosition?.right,
            'origin-bottom-left after:bottom-0 after:left-0 after:rotate-[-84deg]':
              adapterPosition?.bottom && adapterPosition?.left,
            'origin-bottom-right after:bottom-0 after:right-0 after:rotate-6':
              adapterPosition?.bottom && adapterPosition?.right,
            'rounded-sm px-2 py-1 text-xs shadow-sm': themeSize === 'sm',
            'rounded-md px-3 py-1.5 shadow': themeSize === 'md',
            'rounded-lg px-4 py-2.5 text-lg shadow-lg': themeSize === 'lg',
            'bg-cyan-500 text-white': themeColor === 'primary',
            'bg-slate-500 text-white': themeColor === 'secondary',
          })}
        >
          {show && children}
        </Smooth>,
        document.body,
      )}
    </i>
  );
};

export default Tooltip;
