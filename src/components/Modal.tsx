import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import { WithTheme } from '#/theme';
import Button from './Button';
import clsx from 'clsx';
export interface ModalProps extends WithTheme {
  show?: boolean;
  timeout?: number;
  children?: ReactNode;
  removeLayer?: boolean;
  onClose?: () => unknown;
}
const Modal = ({
  themeColor = 'primary',
  themeSize = 'md',
  onClose,
  removeLayer = false,
  children,
  show,
  timeout = 0,
}: ModalProps) => {
  const [hide, setHide] = useState(false);

  const handleClick = () => setHide(true);
  const handleEnd = (show: boolean) => {
    if (!show && onClose) onClose();
  };
  useEffect(() => {
    if (!show) return;
    setHide(false);

    if (!timeout) return;
    const sti = setTimeout(() => setHide(true), timeout);
    return () => clearTimeout(sti);
  }, [timeout, show]);
  return createPortal(
    <>
      <Smooth className="fixed inset-0 z-50 bg-slate-800 bg-opacity-30">{show && !hide && !removeLayer}</Smooth>

      <Smooth
        on="animate-modal-in"
        off="animate-modal-out"
        className={clsx({
          'fixed left-1/2 top-1/2 z-50 origin-top-left': true,
          'rounded-sm px-2 py-1 text-xs shadow-sm': themeSize === 'sm',
          'rounded-md px-3 py-1.5 shadow': themeSize === 'md',
          'rounded-lg px-4 py-2.5 text-lg shadow-lg': themeSize === 'lg',
          'border-cyan-500 bg-cyan-500 text-white': themeColor === 'primary',
          'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
        })}
        onEnd={handleEnd}
      >
        {show && !hide && (
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
      </Smooth>
    </>,

    document.body,
  );
};

export default Modal;
