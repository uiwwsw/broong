import { KeyboardEvent, useRef } from 'react';

interface UseHoldProps {
  code?: string;
  onDown: Function;
  onUp: Function;
}
const useKeyMatch = ({ code = 'Enter', onDown, onUp }: UseHoldProps) => {
  const once = useRef(false);

  const handleDown = (e: KeyboardEvent) => {
    if (e.code === code) {
      if (once.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      once.current = true;
      onDown(e);
    }
  };
  const handleUp = (e: KeyboardEvent) => {
    if (e.code === code) {
      once.current = false;
      onUp(e);
    }
  };
  return {
    onKeyDown: handleDown,
    onKeyUp: handleUp,
  };
};

export default useKeyMatch;
