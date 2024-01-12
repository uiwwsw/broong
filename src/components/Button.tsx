// import { MouseEvent } from 'react';

import generateRipple from '#/generateRipple';
import useHold from '#/useHold';
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
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onHoldEnd?: ButtonProps['onClick'];
  onHoldStart?: ButtonProps['onClick'];
}
function Button({ onHoldEnd, onHoldStart, children, ...props }: ButtonProps) {
  const holdProps = useHold({
    onHoldBefore: generateRipple,
    onHoldEnd,
    onHoldStart,
  });
  return (
    <button {...props} {...holdProps} style={{ clipPath: 'border-box' }}>
      {children}
    </button>
  );
}

export default Button;
