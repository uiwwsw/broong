import { RefObject, useState } from 'react';
interface usePositionProps {
  hasWidth?: boolean;
  ref?: RefObject<HTMLElement>;
}
const usePosition = ({ ref, hasWidth = false }: usePositionProps) => {
  const [position, setPosition] = useState<
    { top?: number; right?: number; bottom?: number; left?: number; width?: number } | undefined
  >();
  const trigger = () => {
    if (!ref?.current) return position;
    const { innerWidth, innerHeight } = window;
    const { top, right, bottom, left, width } = ref.current.getBoundingClientRect();
    const y = innerHeight / 2 > (bottom - top) / 2 + top;
    const x = innerWidth / 2 > (right - left) / 2 + left;
    const newPosition: typeof position = {
      [x ? 'left' : 'right']: x ? right : innerWidth - left,
      [y ? 'top' : 'bottom']: y ? bottom : innerHeight - top,
    };
    if (hasWidth) newPosition.width = width;
    setPosition(newPosition);
    return newPosition;
  };
  return {
    position,
    trigger,
  };
};

export default usePosition;
