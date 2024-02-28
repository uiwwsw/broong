import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import useTheme, { WithTheme } from '#/useTheme';
import Button from './Button';
import mergeClassName from '#/mergeClassName';
import useThrottle from '#/useThrottle';
interface ToastProps extends WithTheme {
  show?: boolean;
  timeout?: number;
  delay?: number;
  children?: ReactNode;
}
const Toast = ({ children, delay, show, timeout = 0, componentName = 'toast', ...props }: ToastProps) => {
  const theme = useTheme({ ...props, componentName });
  const [hide, setHide] = useState(false);
  const visible = useMemo(() => show && !hide, [show, hide]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const handleResize = useCallback(() => {
    if (window.visualViewport) {
      const vv = window.visualViewport;
      const { scrollY, scrollX } = window;
      setPosition({ top: vv.height + scrollY, left: vv.width / 2 + scrollX });
    }
  }, [setPosition]);
  const throttleResize = useThrottle(handleResize, 100);
  const handleClick = () => setHide(true);
  // const handleStart = () => {
  //   document.body.style.overflow = 'hidden';
  // };
  // const handleEnd = () => {
  //   document.body.style.overflow = '';
  // };
  useEffect(() => {
    if (visible) handleResize();
  }, [visible, handleResize]);
  useEffect(() => {
    if (visible) {
      window.addEventListener('scroll', throttleResize);
      window.addEventListener('resize', throttleResize);
    } else {
      window.removeEventListener('scroll', throttleResize);
      window.removeEventListener('resize', throttleResize);
    }
    return () => {
      window.removeEventListener('scroll', throttleResize);
      window.removeEventListener('resize', throttleResize);
    };
  }, [visible, throttleResize]);
  useEffect(() => {
    if (!show) return;
    setHide(false);

    if (!timeout) return;
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <Smooth type="toast" delay={delay} style={position} className={mergeClassName(theme)}>
      {visible && (
        <>
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
        </>
      )}
    </Smooth>,
    document.body,
  );
};

export default Toast;
