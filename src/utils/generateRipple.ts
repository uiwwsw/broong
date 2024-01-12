import { MouseEvent } from 'react';
import requestAnimationFrame from './requestAnimationFrame';
const generateRipple = (e: MouseEvent) => {
  let complete = false;
  const duration = 1000;
  const target = e.currentTarget as HTMLElement;
  const ripple = document.createElement('i');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const setAnimate = () => {
    complete = true;
    ripple.classList.add('ripple--begin');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.opacity = '1';
  };

  ripple.style.width = ripple.style.height = '0px';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.className = 'ripple';
  target.addEventListener('touchend', setAnimate);
  target.addEventListener('mouseup', setAnimate);
  target.addEventListener('mouseleave', setAnimate);
  ripple.addEventListener('animationend', () => {
    ripple.remove();
    target.removeEventListener('touchend', setAnimate);
    target.removeEventListener('mouseup', setAnimate);
    target.removeEventListener('mouseleave', setAnimate);
  });
  target.appendChild(ripple);

  requestAnimationFrame((timeElapsed: number) => {
    if (complete) return false;
    if (timeElapsed < duration) {
      const percent = timeElapsed / 1000;
      ripple.style.width = ripple.style.height = `${size * percent}px`;
      ripple.style.opacity = `${Math.min(percent, 1)}`;
      return true;
    }
    return false;
  });
};

export default generateRipple;
