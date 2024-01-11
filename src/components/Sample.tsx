// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Button from './Button';
import useDebounce from '#/useDebounce';
interface SampleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: number) => unknown;
}
function Sample({ max, min = 1, onChange }: SampleProps) {
  const [value, setValue] = useState<number | ''>(+(min ?? 0));
  const holdRef = useRef(false);
  const getValue = (newValue: number) => {
    if (newValue === value) return value;

    if (newValue > +value) {
      return Math.min(newValue, +(max ?? newValue));
    } else {
      return Math.max(newValue, +(min ?? newValue));
    }
  };
  const adapterGetValue = (newValue: string) => {
    if (newValue === '') return '';
    return getValue(+newValue);
  };
  const handleChange = useDebounce(onChange);
  const handlePlus = () => setValue(getValue(+value + 1));
  const handleMinus = () => setValue(getValue(+value - 1));
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(adapterGetValue(e.target.value));
  const handleBlur = () => (value === '' ? setValue(+min) : null);
  const handlePlusHold = () => {
    holdRef.current = true;
    const event = () => {
      if (holdRef.current === false) return;
      setValue((prev) => getValue(+prev + 1));
      window.requestAnimationFrame(event);
    };
    event();
  };
  const handleHoldEnd = () => (holdRef.current = false);
  const handleMinusHold = () => {
    holdRef.current = true;
    const event = () => {
      if (holdRef.current === false) return;
      setValue((prev) => getValue(+prev - 1));
      window.requestAnimationFrame(event);
    };
    event();
  };
  useEffect(() => {
    if (value !== '' && onChange) handleChange(value);
  }, [value, onChange]);
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
        value={value}
        onInput={handleInput}
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
