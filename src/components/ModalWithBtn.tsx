import { useState } from 'react';
import Modal, { ModalProps } from './Modal';
import Button from './Button';

interface ModalWithBtnProps extends ModalProps {
  btnText?: string;
}
const ModalWithBtn = ({ btnText, ...props }: ModalWithBtnProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>{btnText}</Button>
      <Modal {...props} show={show} onClose={handleClose} />
    </>
  );
};

export default ModalWithBtn;
