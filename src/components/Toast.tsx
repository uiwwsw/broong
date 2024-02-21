import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import useTheme, { WithTheme } from '#/useTheme';
import Button from './Button';
interface ToastProps extends WithTheme {
  show?: boolean;
  timeout?: number;
  children?: ReactNode;
}
const Toast = ({ children, show, timeout = 0, componentName = 'toast', ...props }: ToastProps) => {
  const theme = useTheme({ ...props, componentName });
  const [hide, setHide] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const handleResize = () => {
    if (window.visualViewport) {
      const vv = window.visualViewport;
      const { scrollY, scrollX } = window;
      setPosition({ top: vv.height + scrollY, left: vv.width / 2 + scrollX });
    }
  };
  const handleClick = () => setHide(true);
  useEffect(() => {
    handleResize();
    window.addEventListener('scroll', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [show]);
  useEffect(() => {
    if (!show) return;
    setHide(false);

    if (!timeout) return;
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Smooth type="drop" style={position} className="pointer-events-auto">
        {show && !hide && (
          <div className={theme}>
            {children}
            <Button
              onClick={handleClick}
              componentName={null}
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 overflow-hidden rounded-full bg-inherit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          </div>
        )}
      </Smooth>
    </div>,
    document.body,
  );
};

export default Toast;
