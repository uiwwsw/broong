import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
interface TooltipProps {
  children?: ReactNode;
  slot?: ReactNode;
}
const Tooltip = ({ slot, children }: TooltipProps) => {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  const handleOver = () => {
    setShow(true);
    if (ref.current) {
      ref.current.getBoundingClientRect();
    }
  };

  return (
    <i className="inline-block" ref={ref} onMouseOver={handleOver}>
      {slot}
      {createPortal(
        <Smooth type="zoom">
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
