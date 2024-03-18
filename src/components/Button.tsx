import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

export default Button;
