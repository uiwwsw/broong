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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const vv = window.visualViewport;
        const { scrollY, scrollX } = window;
        setPosition({ top: vv.height + scrollY, left: vv.width / 2 + scrollX });
      }
    };
    handleResize();
    window.addEventListener('scroll', handleResize);
    window.addEventListener('focus', handleResize);
    window.addEventListener('blur', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('focus', handleResize);
      window.removeEventListener('blur', handleResize);
    };
  }, [show]);
  useEffect(() => {
    if (!timeout || !show) return;
    setHide(false);
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <Smooth type="drop" style={position}>
      {show && !hide && <div className={theme}>{children}</div>}
    </Smooth>,
    document.body,
  );
};

export default Toast;
