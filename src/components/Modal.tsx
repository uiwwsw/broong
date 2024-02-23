import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Smooth from './Smooth';
import useTheme, { WithTheme } from '#/useTheme';
import Button from './Button';
import mergeClassName from '#/mergeClassName';
export interface ModalProps extends WithTheme {
  show?: boolean;
  timeout?: number;
  children?: ReactNode;
  removeLayer?: boolean;
  onClose?: () => unknown;
}
const Modal = ({
  onClose,
  removeLayer = false,
  children,
  show,
  timeout = 0,
  componentName = 'modal',
  ...props
}: ModalProps) => {
  const theme = useTheme({ ...props, componentName });
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
      <Smooth>
        {show && !hide && !removeLayer && <i className="fixed inset-0 z-50 bg-slate-800 bg-opacity-30" />}
      </Smooth>

      <Smooth type="modal" className={mergeClassName(theme)} onEnd={handleEnd}>
        {show && !hide && (
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
      </Smooth>
    </>,

    document.body,
  );
};

export default Modal;
