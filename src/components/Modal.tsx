import { ReactNode, useRef } from 'react';
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
    entering: { display: 'flex' },
    entered: { opacity: 1, display: 'flex' },
    exiting: { display: 'flex' },
  };
  // return createPortal(
  //   <Transition nodeRef={nodeRef} in={show} timeout={duration}>
  //     {(state) => (
  //       <div
  //         ref={nodeRef}
  //         className="fixed inset-0 hidden overflow-auto opacity-0 transition-opacity"
  //         style={{ ...defaultStyle, ...transitionStyles[state] }}
  //       >
  //         {children}
  //       </div>
  //     )}
  //   </Transition>,
  //   document.body,
  return createPortal(
    <Transition nodeRef={nodeRef} in={show} timeout={duration}>
      {(state) =>
        state !== 'exited' ? (
          <div
            ref={nodeRef}
            className="fixed inset-0 hidden overflow-auto opacity-0 transition-opacity"
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            {children}
          </div>
        ) : null
      }
    </Transition>,
    document.body,
  );
};

export default Modal;
