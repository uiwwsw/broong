import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
interface TooltipProps {
  children?: ReactNode;
  slot?: ReactNode;
  timeout?: number;
}
const Tooltip = ({ slot, children, timeout = 0 }: TooltipProps) => {
  const ref = useRef<HTMLElement>(null);
  const able = useRef(true);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<
    { top?: number; right?: number; bottom?: number; left?: number } | undefined
  >();
  const handleEnter = () => {
    if (ref.current && able.current) {
      able.current = false;

      const { innerWidth, innerHeight } = window;
      const { top, right, bottom, left } = ref.current.getBoundingClientRect();
      const y = innerHeight / 2 > (bottom - top) / 2 + top;
      const x = innerWidth / 2 > (right - left) / 2 + left;
      setShow(true);
      setPosition({
        [x ? 'left' : 'right']: x ? left : innerWidth - right,
        [y ? 'top' : 'bottom']: y ? top : innerHeight - bottom,
      });
    }
  };
  const handleLeave = () => {
    able.current = true;
    setShow(false);
  };
  useEffect(() => {
    if (!show || !timeout) return;
    const sti = setTimeout(() => setShow(false), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return (
    <i className="inline-block" ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {slot}
      {createPortal(
        <Smooth type="zoom" style={position}>
          {show && (
            <div className="mt-3 rounded-md bg-slate-700 px-2 py-1 text-xs font-thin text-white">{children}</div>
          )}
        </Smooth>,
        document.body,
      )}
    </i>
  );
};

export default Tooltip;
