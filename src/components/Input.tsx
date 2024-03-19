import { InputHTMLAttributes, forwardRef } from 'react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input;
