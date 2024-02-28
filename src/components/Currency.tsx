// import { MouseEvent } from 'react';

import { useMemo, useState } from 'react';
import Input, { InputProps } from './Input';
interface CurrencyProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}
const Currency = ({ onChange, themeSize, themeColor, ...props }: CurrencyProps) => {
  const [value, setValue] = useState('');
  const displayValue = useMemo(() => {
    if (value === '-' || value === '') return value;
    const newValue = value.replace(/^0+(\d+)/g, '$1');

    const index = newValue.indexOf('.');
    if (index === -1) return (+newValue).toLocaleString();

    return (+newValue.substring(0, index)).toLocaleString() + newValue.substring(index);
  }, [value]);
  const getValue = (newValue: string) => {
    newValue = newValue.trim().replace(/,/g, '');
    if (newValue === '-') return newValue;
    if (isNaN(Number(newValue))) return value;
    return newValue;
  };
  const handleChange = (newValue: string) => {
    newValue = getValue(newValue);
    setValue(newValue);
    if (isNaN(Number(newValue))) return;
    onChange && onChange(newValue);
  };
  return (
    <Input {...props} themeColor={themeColor} themeSize={themeSize} value={displayValue} onChange={handleChange} />
  );
};

export default Currency;
