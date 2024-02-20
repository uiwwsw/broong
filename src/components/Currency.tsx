// import { MouseEvent } from 'react';

import { ChangeEvent, useMemo, useState } from 'react';
import Input, { InputProps } from './Input';
interface CurrencyProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}
const Currency = ({ onChange, themeSize, themeColor, ...props }: CurrencyProps) => {
  const [value, setValue] = useState('');
  const displayValue = useMemo(() => {
    if (value === '') return '';

    const index = value.indexOf('.');
    if (index !== -1) return (+value.substring(0, index)).toLocaleString() + value.substring(index);

    return (+value).toLocaleString();
  }, [value]);
  const getValue = (newValue: string) => {
    newValue = newValue.replace(/,/g, '');

    const number = Number(newValue);
    if (isNaN(number)) return value;
    return newValue.trim().replace(/^0+(\d+)/g, '$1');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = getValue(e.target.value);
    setValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <Input {...props} themeColor={themeColor} themeSize={themeSize} value={displayValue} onChange={handleChange} />
  );
};

export default Currency;
