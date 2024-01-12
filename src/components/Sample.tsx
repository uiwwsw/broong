// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Button from './Button';
import useDebounce from '#/useDebounce';
import requestAnimationFrame from '#/requestAnimationFrame';
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
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') return;

    const newValue = getValue(+value);
    setValue(newValue);
    if (newValue === min || newValue === max) return (e.target.value = `${newValue}`);
  };
  // const handleRequestFrame = (direct: boolean) => () => {
  //   // let startTime: number;
  //   holdRef.current = true;
  //   const event = () => {
  //     //time: number
  //     if (holdRef.current === false) return;
  //     // if (startTime === undefined) startTime = time;

  //     // 10의 배수
  //     // const step = Math.floor((time - startTime) / 1000);
  //     // setValue((prev) => getValue(+prev + 10 ** step * (direct ? 1 : -1)));
  //     // 순차 증가
  //     // const step = Math.floor((time - startTime) / 1000);
  //     // setValue((prev) => getValue(+prev + step * (direct ? 1 : -1)));
  //     setValue((prev) => getValue(+prev + (direct ? 1 : -1)));
  //     window.requestAnimationFrame(event);
  //   };
  //   window.requestAnimationFrame(event);
  // };
  const handlePlusHold = () => {
    holdRef.current = true;
    requestAnimationFrame(() => {
      setValue((prev) => getValue(+prev + 1));
      return holdRef.current;
    });
  };
  const handleHoldEnd = () => (holdRef.current = false);
  const handleMinusHold = () => {
    holdRef.current = true;
    requestAnimationFrame(() => {
      setValue((prev) => getValue(+prev - 1));
      return holdRef.current;
    });
  };
  useEffect(() => handleChange(value), [value, handleChange]);
  return (
    <div className="inline-flex rounded-md border border-slate-700">
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
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </Button>
      <input
        placeholder={`${min}~${max}`}
        max={max}
        min={min}
        type="number"
        value={focus ? undefined : value}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-16 text-center text-lg font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      </Button>
    </div>
  );
}

export default Sample;
