import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
interface ToastProps {
  show?: boolean;
  timeout?: number;
  children?: ReactNode;
}
const Toast = ({ children, show, timeout = 0 }: ToastProps) => {
  const [hide, setHide] = useState(false);
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (!timeout || !show) return;
    if (window.visualViewport) {
      const vv = window.visualViewport;

      setTop(vv.height);
    }
    setHide(false);
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <Smooth type="drop" style={{ top }}>
      {show && !hide && (
        <div className="mb-3 rounded-md bg-slate-700 px-2 py-1 text-xs font-thin text-white">{children}</div>
      )}
    </Smooth>,
    document.body,
  );
};

export default Toast;
