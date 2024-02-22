import { RefObject, useState } from 'react';
interface usePositionProps {
  hasWidth?: boolean;
  ref?: RefObject<HTMLElement>;
}
const usePosition = ({ ref }: usePositionProps) => {
  const [position, setPosition] = useState<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  }>();
  const trigger = () => {
    if (!ref?.current) return position;
    const { top, right, bottom, left, width, height } = ref.current.getBoundingClientRect();

    setPosition({
      top,
      right,
      bottom,
      left,
      width,
      height,
    });
  };
  return {
    position,
    trigger,
  };
};

export default usePosition;
