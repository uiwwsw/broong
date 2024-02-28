import { MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import useAnimation from '#/useAnimation';
import useDebounce from '#/useDebounce';
import usePreThrottle from './usePreThrottle';
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
    if (active) throw new Error('에니메이션이 끝나지 않고 다시 시작되었습니다.');
    const timeElapsed = new Date().valueOf();
    if (!startTime.current) startTime.current = timeElapsed;
    const percent = Math.min((timeElapsed - startTime.current) / 1000, 1);
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
          className: 'ripple',
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
        className: 'ripple ripple--begin',
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
          className={x.className}
          style={{ left: x.left, top: x.top, width: x.width, height: x.height, opacity: x.opacity }}
        />
      ),
    ),
  };
};

export default useRipple;
