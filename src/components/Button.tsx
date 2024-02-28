// import { MouseEvent } from 'react';

import mergeClassName from '#/mergeClassName';
import useDebounce from '#/useDebounce';
import useHold from '#/useHold';
import useMergeProps from '#/useMergeFn';
import useRipple from '#/useRipple';
import getClassName, { WithTheme } from '#/theme';
import { ButtonHTMLAttributes } from 'react';

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
const className = {
  default: 'relative box-border overflow-hidden border disabled:cursor-not-allowed disabled:opacity-35',
  sm: 'rounded-sm p-1 py-0 text-sm',
  md: 'rounded-md p-2 py-1',
  lg: 'rounded-lg p-4 py-1.5 text-lg',
  primary: 'border-cyan-500 bg-cyan-500 text-white',
  secondary: 'border-slate-500 bg-slate-500 text-white',
};
const Button = ({
  onHold,
  children,
  delay = 0,
  onClick,
  className: inlineClassName,
  themeColor,
  themeSize,
  ...props
}: ButtonProps) => {
  const theme = getClassName({
    className,
    themeColor,
    themeSize,
  });
  const { Ripple, ...rippleProps } = useRipple();
  const holdParams = useHold({ onHold });
  const buttonProps = useMergeProps({
    main: rippleProps,
    other: holdParams,
  });
  const debounceClick = useDebounce(onClick, delay);

  return (
    <button {...props} {...buttonProps} className={mergeClassName(theme, inlineClassName)} onClick={debounceClick}>
      {children}
      {Ripple}
    </button>
  );
};

export default Button;
