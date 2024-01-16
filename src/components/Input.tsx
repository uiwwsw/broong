// import { MouseEvent } from 'react';

import generateRipple from '#/generateRipple';
import useDebounce from '#/useDebounce';
import useHold from '#/useHold';
import { InputHTMLAttributes, useEffect, useState } from 'react';

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
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onHold?: InputProps['onClick'];
  onFocus?: () => unknown;
  onBlur?: () => unknown;
  onChange?: (value?: string) => unknown;
}
const Input = ({ onHold, children, className, type = 'text', onChange, onFocus, onBlur, ...props }: InputProps) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const holdProps = useHold({
    onHoldBefore: generateRipple,
    onHold,
  });
  const handleChange = useDebounce(onChange);
  const handleFocus = useDebounce(onFocus);
  const handleBlur = useDebounce(onBlur);
  useEffect(() => {
    if (onFocus && focus) handleFocus();
    if (onBlur && !focus) handleBlur();
  }, [focus, onFocus, onBlur]);
  useEffect(() => {
    if (onChange) handleChange();
  }, [onChange, value]);
  return (
    <div className={className + (focus ? ' inp--focus' : value ? ' inp--blur' : '')}>
      <span>{children}</span>
      <label {...holdProps} style={{ clipPath: 'border-box' }}>
        <input
          {...props}
          onChange={(e) => setValue(e.currentTarget.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type}
        />
      </label>
    </div>
  );
};

export default Input;
