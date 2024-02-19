import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import useTheme, { WithTheme } from '#/useTheme';
interface ToastProps extends WithTheme<'toast'> {
  show?: boolean;
  timeout?: number;
  children?: ReactNode;
}
const Toast = ({ children, show, timeout = 0, componentName = 'toast', ...props }: ToastProps) => {
  const theme = useTheme({ ...props, componentName });
  const [hide, setHide] = useState(false);
  const [top, setTop] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const vv = window.visualViewport;

        setTop(vv.height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [show]);
  useEffect(() => {
    if (!timeout || !show) return;
    setHide(false);
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <Smooth type="drop" style={{ top }}>
      {show && !hide && <div className={theme}>{children}</div>}
    </Smooth>,
    document.body,
  );
};

export default Toast;
