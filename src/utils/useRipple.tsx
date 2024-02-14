import { KeyboardEvent, MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import useAnimation from '#/useAnimation';
import useDebounce from '#/useDebounce';
import useKeyMatch from './useKeyMatch';
interface Active {
  width?: number;
  height?: number;
  opacity?: number;
}
interface Ripple extends Active {
  left?: number;
  top?: number;
  className?: string;
}
type UseRippleProps = number;
const useRipple = (size: UseRippleProps = 70) => {
  const startTime = useRef(0);
  // const size = useRef<number>(0);
  const [_ripple, setRipple] = useState<(Ripple | undefined)[]>([]);
  const [active, setActive] = useState<Active | undefined>();
  const ripple = useMemo(
    () => _ripple.map((x, i, { length }) => (i === length - 1 && x ? { ...x, ...active } : x)),
    [_ripple, active],
  );
  const animate = () => {
    const timeElapsed = new Date().valueOf();
    if (!startTime.current) startTime.current = timeElapsed;
    const percent = Math.min((timeElapsed - startTime.current) / 1000, 1);
    const rect = size * percent;
    setActive({ width: rect, height: rect, opacity: percent });
  };
  const reset = useDebounce(() => setRipple([]), 1000);

  const { startAnimation, stopAnimation } = useAnimation({ animate });

  const handleAnimateEnd = (index: number) => setRipple((prev) => prev.map((x, i) => (i === index ? undefined : x)));
  const handleKeyDown = (e: KeyboardEvent) => {
    const { width, height } = (e.target as HTMLElement).getBoundingClientRect();
    setRipple((prev) => [
      ...prev,
      {
        left: width / 2,
        top: height / 2,
        className: 'ripple',
      },
    ]);
    setTimeout(startAnimation, 0);
  };
  const handleMouseDown = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple((prev) => [
      ...prev,
      {
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
        className: 'ripple',
      },
    ]);
    setTimeout(startAnimation, 0);
  };
  const handleTouchStart = (e: TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple((prev) => [
      ...prev,
      {
        left: e.touches[0].clientX - rect.left,
        top: e.touches[0].clientY - rect.top,
        className: 'ripple',
      },
    ]);
    setTimeout(startAnimation, 0);
  };
  const handleEnd = () => {
    if (!active) return;
    stopAnimation();
    startTime.current = 0;
    const current = ripple.pop();

    setActive(undefined);
    setRipple([
      ...ripple,
      {
        ...current,
        width: size,
        height: size,
        opacity: 1,
        className: 'ripple ripple--begin',
      },
    ]);
  };
  const keyMatchProps = useKeyMatch({ code: 'Enter', onDown: handleKeyDown, onUp: handleEnd });

  useEffect(() => {
    ripple.length && reset();
  }, [ripple]);
  return {
    ...keyMatchProps,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onMouseUp: handleEnd,
    onTouchEnd: handleEnd,
    onMouseLeave: handleEnd,
    Ripple: ripple.map((x, index) =>
      x === undefined ? null : (
        <i
          onAnimationEnd={() => handleAnimateEnd(index)}
          key={index}
          className={x.className}
          style={{ left: x.left, top: x.top, width: x.width, height: x.height, opacity: x.opacity }}
        />
      ),
    ),
  };
};

export default useRipple;
