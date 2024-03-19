import Toast, { ToastProps } from '@/Toast';
import { useEffect, useState } from 'react';

const ToastWrap = ({ show: initShow, ...props }: ToastProps) => {
  const [show, setShow] = useState(initShow);
  console.log(show);
  useEffect(() => setShow(initShow), [initShow, setShow]);
  return <Toast show={show} onClose={() => setShow(false)} {...props} />;
};

export default ToastWrap;
