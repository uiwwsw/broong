// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Button from './Button';
import useDebounce from '#/useDebounce';
import Input from './Input';
interface SampleProps {
  onChange?: (value: number) => unknown;
  max?: number;
  min?: number;
  debounce?: number;
}
const Sample = ({ max, min = 1, onChange, debounce = 0 }: SampleProps) => {
  const [_value, setValue] = useState<string>(`${min}`);
  const [focus, setFocus] = useState(false);
  const displayValue = useMemo(() => {
    if (_value === '') {
      if (focus) return '';
      return min;
    }
    return +_value;
  }, [_value, focus]);

  const value = useMemo(() => {
    if (_value === '') return min;
    return +_value;
  }, [_value]);

  const getValue = (newValue: number) => {
    if (newValue === value) return value;

    if (newValue > value) {
      return Math.min(newValue, max ?? newValue);
    } else {
      return Math.max(newValue, min ?? newValue);
    }
  };
  const debounceChange = useDebounce(onChange, debounce);
  const handlePlus = () => setValue((prev) => `${getValue(+prev + 1)}`);
  const handleMinus = () => setValue((prev) => `${getValue(+prev - 1)}`);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return setValue('');
    if (isNaN(+value)) return;

    const newValue = getValue(+value);
    setValue(`${newValue}`);
    if (newValue === min || newValue === max) return (e.target.value = `${newValue}`);
  };

  useEffect(() => {
    debounceChange(value);
  }, [value]);

  return (
    <div className="inline-flex rounded-md border border-slate-700">
      <Button className="border-r border-slate-700 p-2" onClick={handlePlus} onHold={handlePlus}>
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
      <Input
        placeholder={`${min}~${max}`}
        max={max}
        min={min}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="inp w-20 text-center font-bold"
      />
      <Button className="border-l border-slate-700 p-2" onClick={handleMinus} onHold={handleMinus}>
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
};

export default Sample;
