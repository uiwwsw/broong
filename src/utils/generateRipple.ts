import { MouseEvent } from 'react';
const generateRipple = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const ripple = document.createElement('i');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const changeAnimate = () => {
    ripple.classList.remove('animate-ripple-start');
    ripple.classList.add('animate-ripple-end');
  };
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - size / 2}px`;
  ripple.style.top = `${e.clientY - size / 2}px`;
  ripple.className =
    'opacity-0 animate-ripple-start fixed z-50 rounded-full pointer-events-none bg-black bg-opacity-20';
  target.appendChild(ripple);
  target.addEventListener('touchend', changeAnimate);
  target.addEventListener('mouseup', changeAnimate);
  target.addEventListener('mouseleave', changeAnimate);
  ripple.addEventListener('animationend', (e: AnimationEvent) => {
    if (e.animationName === 'ripple-end') {
      ripple.remove();
      target.removeEventListener('touchend', changeAnimate);
      target.removeEventListener('mouseup', changeAnimate);
      target.removeEventListener('mouseleave', changeAnimate);
    }
  });
};

export default generateRipple;
