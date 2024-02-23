// import { MouseEvent } from 'react';

import { ChangeEvent, useMemo, useState } from 'react';
import Input, { InputProps } from './Input';
interface NumericProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}
const Numeric = ({ onChange, themeSize, themeColor, ...props }: NumericProps) => {
  const [value, setValue] = useState('');
  const getValue = (newValue: string) => newValue.trim().replace(/\D/g, '');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = getValue(e.target.value);
    // if (newValue === value || isNaN(+newValue)) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   return;
    // }
    // e.currentTarget.value = newValue;
    setValue(newValue);
    onChange && onChange(newValue);
  };
  return <Input {...props} themeColor={themeColor} themeSize={themeSize} value={value} onChange={handleChange} />;
};

export default Numeric;
