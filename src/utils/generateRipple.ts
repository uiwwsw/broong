import { MouseEvent } from 'react';
const generateRipple = (e: MouseEvent) => {
  let requestAnimate = 0;
  let startTime: number;
  const startAnimation = (timeElapsed: number = 0) => {
    if (!startTime) startTime = timeElapsed;
    const percent = Math.min((timeElapsed - startTime) / 1000, 1);
    ripple.style.width = ripple.style.height = `${size * percent}px`;
    ripple.style.opacity = `${percent}`;
    requestAnimate = requestAnimationFrame(startAnimation);
  };
  const stopAnimation = () => {
    startTime = 0;
    cancelAnimationFrame(requestAnimate);
  };
  const target = e.currentTarget as HTMLElement;
  const ripple = document.createElement('i');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const setAnimate = () => {
    stopAnimation();
    ripple.classList.add('ripple--begin');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.opacity = '1';
  };

  ripple.style.width = ripple.style.height = '0px';
  if (target.style.clipPath === 'border-box') {
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.className = 'ripple';
  } else {
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.className = 'ripple ripple--absolute';
  }
  target.addEventListener('touchend', setAnimate);
  target.addEventListener('mouseup', setAnimate);
  target.addEventListener('mouseleave', setAnimate);
  ripple.addEventListener('animationend', () => {
    stopAnimation();
    ripple.remove();
    target.removeEventListener('touchend', setAnimate);
    target.removeEventListener('mouseup', setAnimate);
    target.removeEventListener('mouseleave', setAnimate);
  });
  target.appendChild(ripple);

  startAnimation();
};

export default generateRipple;
