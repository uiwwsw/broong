// import { MouseEvent } from 'react';

import { ChangeEvent, useEffect, useState } from 'react';
import Input, { InputProps } from './Input';
import Toast from './Toast';
interface NumericProps extends Omit<InputProps, 'onChange'> {
  min?: number;
  max?: number;
  onChange?: (value: string) => void;
}
const Numeric = ({ max = 99, min = 0, onChange, ...props }: NumericProps) => {
  const [msg, setMsg] = useState('');
  const [value, setValue] = useState('');
  const getValue = (value: string) => {
    if (value === '-' && min < 0) return '-';
    const number = Number(value);
    if (isNaN(number)) return '';

    if (number > max || number < min) {
      if (number > max) {
        setMsg(`${value}은 최대값을 초과했습니다.`);
        return max.toString();
      } else if (value !== '') {
        setMsg(`최소값보다 작은 ${value}은 입력할 수 없습니다.`);
        return min.toString();
      } else {
        return '';
      }
    }
    return value.trim().replace(/\b0+(\d+)/g, '$1');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg('');
    setValue(getValue(e.target.value));
  };
  useEffect(() => {
    if (value && !isNaN(+value) && onChange) onChange(value);
  });
  return (
    <>
      <Input {...props} value={value} onChange={handleChange} />
      <Toast show={!!msg} timer={3000}>
        {msg}
      </Toast>
    </>
  );
};

export default Numeric;
