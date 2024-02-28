// import { MouseEvent } from 'react';

import { useState } from 'react';
import Input, { InputProps } from './Input';
interface NumericProps extends InputProps {}
const Numeric = ({ onChange, themeSize, themeColor, ...props }: NumericProps) => {
  const [value, setValue] = useState('');
  const getValue = (newValue: string) => newValue.trim().replace(/\D/g, '');
  const handleChange = (newValue: string) => {
    newValue = getValue(newValue);
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
