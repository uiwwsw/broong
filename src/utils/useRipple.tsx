import { MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import useAnimation from '#/useAnimation';
import useDebounce from '#/useDebounce';
import usePreThrottle from './usePreThrottle';
import clsx from 'clsx';
interface Active {
  width?: number;
  height?: number;
  opacity?: number;
}
interface Ripple extends Active {
  left?: number;
  top?: number;
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
    if (active) throw new Error('에니메이션이 끝나지 않고 다시 시작되었습니다.');
    const timeElapsed = new Date().valueOf();
    if (!startTime.current) startTime.current = timeElapsed;
    const percent = Math.min((timeElapsed - startTime.current) / 1000, 0.9);
    const rect = size * percent;
    setActive({ width: rect, height: rect, opacity: percent });
  };
  const reset = useDebounce(() => setRipple([]), 1000);

  const { startAnimation, stopAnimation } = useAnimation({ animate });

  const handleAnimateEnd = (index: number) => setRipple((prev) => prev.map((x, i) => (i === index ? undefined : x)));

  const handleStart = usePreThrottle((e: MouseEvent | TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple((prev) => {
      const left =
        (e as MouseEvent).clientX !== undefined ? (e as MouseEvent).clientX : (e as TouchEvent).touches[0].clientX;
      const top =
        (e as MouseEvent).clientY !== undefined ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;
      return [
        ...prev,
        {
          left: left - rect.left,
          top: top - rect.top,
        },
      ];
    });
    startAnimation();
  }, 100);
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
      },
    ]);
  };

  useEffect(() => {
    ripple.length && reset();
  }, [ripple, reset]);
  return {
    onMouseDown: handleStart,
    onTouchStart: handleStart,
    onMouseUp: handleEnd,
    onTouchEnd: handleEnd,
    onMouseLeave: handleEnd,
    onTouchCancel: handleEnd,
    Ripple: ripple.map((x, index) =>
      x === undefined ? null : (
        <i
          onAnimationEnd={() => handleAnimateEnd(index)}
          key={index}
          className={clsx({
            'pointer-events-none absolute z-50 h-0 w-0 origin-top-left -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-10 opacity-0':
              true,
            'animate-ripple transition-all duration-300': x.opacity === 1,
          })}
          style={{ left: x.left, top: x.top, width: x.width, height: x.height, opacity: x.opacity }}
        />
      ),
    ),
  };
};

export default useRipple;
