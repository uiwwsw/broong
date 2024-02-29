import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import { WithTheme } from '#/theme';
import Button from './Button';
import useThrottle from '#/useThrottle';
import clsx from 'clsx';
interface ToastProps extends WithTheme {
  show?: boolean;
  timeout?: number;
  delay?: number;
  children?: ReactNode;
}
const Toast = ({ children, delay, show, timeout = 0, themeColor = 'primary', themeSize = 'md' }: ToastProps) => {
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
    <Smooth
      on="animate-toast-in"
      off="animate-toast-out"
      delay={delay}
      style={position}
      className={clsx({
        'absolute left-1/2 z-50 origin-bottom -translate-x-1/2 px-2 py-1 font-thin opacity-0': true,
        'rounded-sm px-2 py-1 text-xs shadow-sm': themeSize === 'sm',
        'rounded-md px-3 py-1.5 shadow': themeSize === 'md',
        'rounded-lg px-4 py-2.5 text-lg shadow-lg': themeSize === 'lg',
        'border-cyan-500 bg-cyan-500 text-white': themeColor === 'primary',
        'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
      })}
    >
      {visible && (
        <>
          {children}
          <Button
            onClick={handleClick}
            className="!absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 overflow-hidden !rounded-full bg-inherit !p-0"
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
