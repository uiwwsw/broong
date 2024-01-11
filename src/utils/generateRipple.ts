import { MouseEvent } from 'react';
const generateRipple = (e: MouseEvent) => {
  let complete = false;
  let startTime: number;
  const duration = 1000;
  const target = e.currentTarget as HTMLElement;
  const ripple = document.createElement('i');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const setAnimate = () => {
    complete = true;
    ripple.classList.add('transition-all', 'duration-300', 'animate-ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.opacity = '1';
  };
  const requestAnimationFrame = (time: number) => {
    if (complete) return;
    if (startTime === undefined) startTime = time;

    const timeElapsed = time - startTime;
    const percent = timeElapsed / 1000;
    if (timeElapsed < duration) {
      ripple.style.width = ripple.style.height = `${size * percent}px`;
      ripple.style.opacity = `${Math.min(percent, 1)}`;
      window.requestAnimationFrame(requestAnimationFrame);
    }
  };
  ripple.style.width = ripple.style.height = '0px';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.className =
    'opacity-0 fixed z-50 rounded-full pointer-events-none bg-black bg-opacity-20 -translate-x-1/2 -translate-y-1/2 origin-top-left';
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

  window.requestAnimationFrame(requestAnimationFrame);
};

export default generateRipple;
