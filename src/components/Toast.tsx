import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
interface ToastProps {
  show?: boolean;
  timer?: number;
  children?: ReactNode;
}
const Toast = ({ children, show, timer = 0 }: ToastProps) => {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (!timer || !show) return;
    setHide(false);
    const sti = setTimeout(() => setHide(true), timer);
    return () => clearTimeout(sti);
  }, [timer, show]);
  return createPortal(
    <Smooth type="drop">
      {show && !hide && (
        <div className="mt-3 rounded-md bg-slate-700 px-2 py-1 text-xs font-thin text-white">{children}</div>
      )}
    </Smooth>,
    document.body,
  );
};

export default Toast;
