// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Button from './Button';
import useDebounce from '#/useDebounce';
interface SampleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: number) => unknown;
}
function Sample({ max, min = 1, onChange }: SampleProps) {
  const [value, setValue] = useState<number>(+(min ?? 0));
  const [focus, setFocus] = useState(false);
  const holdRef = useRef(false);
  const getValue = (newValue: number) => {
    if (newValue === value) return value;

    if (newValue > value) {
      return Math.min(newValue, +(max ?? newValue));
    } else {
      return Math.max(newValue, +(min ?? newValue));
    }
  };
  const handleChange = useDebounce(onChange);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handlePlus = () => setValue(getValue(value + 1));
  const handleMinus = () => setValue(getValue(value - 1));
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(getValue(+e.target.value));
  const handleRequestFrame = (direct: boolean) => () => {
    // let startTime: number;
    holdRef.current = true;
    const event = () => {
      //time: number
      if (holdRef.current === false) return;
      // if (startTime === undefined) startTime = time;

      // 10의 배수
      // const step = Math.floor((time - startTime) / 1000);
      // setValue((prev) => getValue(+prev + 10 ** step * (direct ? 1 : -1)));
      // 순차 증가
      // const step = Math.floor((time - startTime) / 1000);
      // setValue((prev) => getValue(+prev + step * (direct ? 1 : -1)));
      setValue((prev) => getValue(+prev + (direct ? 1 : -1)));
      window.requestAnimationFrame(event);
    };
    window.requestAnimationFrame(event);
  };
  const handlePlusHold = handleRequestFrame(true);
  const handleHoldEnd = () => (holdRef.current = false);
  const handleMinusHold = handleRequestFrame(false);
  useEffect(() => handleChange(value), [value, handleChange]);
  return (
    <div className="border border-slate-700 rounded-md inline-flex">
      <Button
        className="border-r border-slate-700 p-2"
        onClick={handlePlus}
        onHoldStart={handlePlusHold}
        onHoldEnd={handleHoldEnd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </Button>
      <input
        max={max}
        min={min}
        type="number"
        value={focus ? undefined : value}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center w-10 outline-none text-lg font-bold"
      />
      <Button
        className="border-l border-slate-700 p-2"
        onClick={handleMinus}
        onHoldStart={handleMinusHold}
        onHoldEnd={handleHoldEnd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      </Button>
    </div>
  );
}

export default Sample;
