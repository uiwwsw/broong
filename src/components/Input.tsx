// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, FocusEvent, InputHTMLAttributes, useState } from 'react';

// const generateRipple = (e: MouseEvent) => {
//   const target = e.currentTarget;
//   const ripple = document.createElement('i');
//   const rect = target.getBoundingClientRect();
//   const size = Math.max(rect.width, rect.height);
//   ripple.style.width = ripple.style.height = `${size}px`;
//   ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//   ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
//   ripple.className = 'ripple';

//   target.appendChild(ripple);

//   ripple.addEventListener('animationend', () => {
//     ripple.remove();
//   });
// };

// export default generateRipple;
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  debounce?: number;
}
const Input = ({
  children,
  className,
  type = 'text',
  onChange,
  onFocus,
  onBlur,
  debounce = 0,
  ...props
}: InputProps) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const debounceChange = useDebounce(onChange, debounce);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceChange(e);
    setValue(e.currentTarget.value);
  };
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus && onFocus(e);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur && onBlur(e);
  };
  return (
    <label className={className + (focus ? ' inp--focus' : value ? ' inp--blur' : '')}>
      {/* <label {...holdProps} style={{ clipPath: 'border-box' }}> */}
      {children ? (
        <p>
          <span>{children}</span>
        </p>
      ) : null}
      <input
        {...props}
        style={{ textAlign: 'inherit' }}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
      />
    </label>
  );
};

export default Input;
