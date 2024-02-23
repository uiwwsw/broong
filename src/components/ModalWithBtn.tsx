import { ReactElement, useState } from 'react';
import Modal, { ModalProps } from './Modal';

interface ModalWithBtnProps extends ModalProps {
  button?: ReactElement;
}
const ModalWithBtn = ({ button, ...props }: ModalWithBtnProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      {button}
      <Modal {...props} show={show} onClose={handleClose} />
    </>
  );
};

export default ModalWithBtn;
