// import { MouseEvent } from 'react';

import mergeClassName from '#/mergeClassName';
import useDebounce from '#/useDebounce';
import useHold from '#/useHold';
import useMergeProps from '#/useMergeFn';
import useRipple from '#/useRipple';
import useTheme, { WithTheme } from '#/useTheme';
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
  onHold?: ButtonProps['onClick'];
  debounce?: number;
}
const Button = ({
  onHold,
  children,
  debounce = 0,
  onClick,
  className,
  componentName = 'btn',
  themeColor,
  themeSize,
  ...props
}: ButtonProps) => {
  const theme = useTheme({
    componentName,
    themeColor,
    themeSize,
  });
  const { Ripple, ...rippleProps } = useRipple();
  const holdParams = useHold({ onHold });
  const buttonProps = useMergeProps({
    main: rippleProps,
    other: holdParams,
  });
  const debounceClick = useDebounce(onClick, debounce);

  return (
    <button {...props} {...buttonProps} className={mergeClassName(theme, className)} onClick={debounceClick}>
      {children}
      {Ripple}
    </button>
  );
};

export default Button;
