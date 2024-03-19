import useDebounce from '#/useDebounce';
import { ButtonHTMLAttributes } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  debounce?: number;
}
const Button = ({ onClick, debounce = 100, ...props }: ButtonProps) => {
  const debounceClick = useDebounce(onClick, debounce);
  return <button {...props} onClick={debounceClick} />;
};

export default Button;
