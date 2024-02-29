// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import useHold from '#/useHold';
import useMergeProps from '#/useMergeFn';
import useRipple from '#/useRipple';
import { WithTheme } from '#/theme';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

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
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, WithTheme {
  onHold?: () => unknown;
  delay?: number;
}
const Button = ({
  onHold,
  children,
  delay = 0,
  onClick,
  className,
  themeColor = 'primary',
  themeSize = 'md',
  ...props
}: ButtonProps) => {
  const { Ripple, ...rippleProps } = useRipple();
  const holdParams = useHold({ onHold });
  const buttonProps = useMergeProps({
    main: rippleProps,
    other: holdParams,
  });
  const debounceClick = useDebounce(onClick, delay);

  return (
    <button
      {...props}
      {...buttonProps}
      className={clsx(
        {
          'relative box-border overflow-hidden border disabled:cursor-not-allowed disabled:opacity-35': true,
          'rounded-sm p-1 py-0 text-sm': themeSize === 'sm',
          'rounded-md p-2 py-1': themeSize === 'md',
          'rounded-lg p-4 py-1.5 text-lg': themeSize === 'lg',
          'border-cyan-500 bg-cyan-500 text-white': themeColor === 'primary',
          'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
        },
        className,
      )}
      onClick={debounceClick}
    >
      {children}
      {Ripple}
    </button>
  );
};

export default Button;
