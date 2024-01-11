// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import Button from './Button';
interface SampleProps extends InputHTMLAttributes<HTMLInputElement> {}
function Sample({ max, min = 1 }: SampleProps) {
  const [value, setValue] = useState<number>(+(min ?? 0));
  const getValue = (newValue: number) => {
    if (newValue === value) return value;

    if (newValue > value) {
      return Math.min(newValue, +(max ?? newValue));
    } else {
      return Math.max(newValue, +(min ?? newValue));
    }
  };
  const handlePlus = () => setValue(getValue(value + 1));
  const handleMinus = () => setValue(getValue(value - 1));
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(getValue(+e.target.value));
  const handlePlusHold = () => max !== undefined && setValue(getValue(+max));
  const handleMinusHold = () => min !== undefined && setValue(getValue(+min));

  return (
    <div className="border border-slate-700 rounded-md inline-flex">
      <Button className="border-r border-slate-700 p-2" onClick={handlePlus} onHold={handlePlusHold}>
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
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center w-10 outline-none text-lg font-bold"
      />
      <Button className="border-l border-slate-700 p-2" onClick={handleMinus} onHold={handleMinusHold}>
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
