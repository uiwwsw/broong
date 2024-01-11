import { MouseEvent } from 'react';
function generateRipple(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  const ripple = document.createElement('i');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - size / 2}px`;
  ripple.style.top = `${e.clientY - size / 2}px`;
  ripple.className = 'animate-ripple-start fixed rounded-full pointer-events-none bg-white bg-opacity-60';

  target.appendChild(ripple);
  target.addEventListener('touchend', () => {
    ripple.classList.remove('animate-ripple-start');
    ripple.classList.add('animate-ripple-end');
  });
  target.addEventListener('mouseup', () => {
    ripple.classList.remove('animate-ripple-start');
    ripple.classList.add('animate-ripple-end');
  });
  target.addEventListener('mouseleave', () => {
    ripple.classList.remove('animate-ripple-start');
    ripple.classList.add('animate-ripple-end');
  });
  ripple.addEventListener('animationend', (e: AnimationEvent) => {
    if (e.animationName === 'ripple-end') ripple.remove();
  });
}

export default generateRipple;
