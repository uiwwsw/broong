import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/Button';
import useThrottle from '#/useThrottle';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';
interface ToastProps {
  show?: boolean;
  duration?: number;
  children?: ReactNode;
  onClose?: () => void;
}
const Toast = ({ onClose, children, duration = 300, show }: ToastProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    unmounted: { display: 'none' },
    entering: { display: 'block' },
    entered: { opacity: 1, display: 'block', transform: 'translateY(-20px)' },
    exiting: { display: 'block' },
    exited: { display: 'none' },
  };
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const handleResize = useCallback(() => {
    if (window.visualViewport) {
      const vv = window.visualViewport;
      const { scrollY, scrollX } = window;
      setPosition({ top: vv.height + scrollY, left: scrollX });
    }
  }, [setPosition]);
  const throttleResize = useThrottle(handleResize, 100);
  const handleClick = () => onClose && onClose();
  // const handleStart = () => {
  //   document.body.style.overflow = 'hidden';
  // };
  // const handleEnd = () => {
  //   document.body.style.overflow = '';
  // };
  useEffect(() => {
    if (show) handleResize();
  }, [show, handleResize]);
  useEffect(() => {
    if (show) {
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
  }, [show, throttleResize]);

  return createPortal(
    <Transition nodeRef={nodeRef} in={show} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{ ...position, ...defaultStyle, ...transitionStyles[state] }}
          className="absolute z-50 w-full origin-bottom"
        >
          <div
            className={clsx({
              'absolute inset-4 bottom-0 top-auto m-auto w-fit rounded-md border-slate-500 bg-slate-500 px-3 py-1.5 font-thin text-white shadow':
                true,
            })}
          >
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
          </div>
        </div>
      )}
    </Transition>,
    document.body,
  );
};

export default Toast;
