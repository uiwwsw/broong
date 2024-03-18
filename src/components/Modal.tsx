import { ReactNode, cloneElement, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';

interface ModalProps {
  show?: boolean;
  duration?: number;
  children?: ReactNode;
}

const Modal = ({ show, duration = 300, children }: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    unmounted: { display: 'none' },
    entering: { display: 'block' },
    entered: { opacity: 1, display: 'block' },
    exiting: { display: 'block' },
    exited: { display: 'none' },
  };
  return createPortal(
    <Transition nodeRef={nodeRef} in={show} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          className="fixed inset-0 hidden overflow-auto opacity-0 transition-opacity"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          {children}
        </div>
      )}
    </Transition>,
    document.body,
  );
};

export default Modal;
