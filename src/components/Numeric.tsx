// import { MouseEvent } from 'react';

import { ChangeEvent, useState } from 'react';
import Input, { InputProps } from './Input';
interface NumericProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}
const Numeric = ({ onChange, themeSize, themeColor, ...props }: NumericProps) => {
  const [value, setValue] = useState('');
  const getValue = (newValue: string) => {
    if (newValue === '-') return '-';

    const number = Number(newValue);
    if (isNaN(number)) return value;
    // if (number > max || number < min) {
    //   if (number > max) {
    //     return max.toString();
    //   } else if (newValue !== '') {
    //     return min.toString();
    //   } else {
    //     return '';
    //   }
    // }
    return newValue.trim().replace(/\b0+(\d+)/g, '$1');
  };
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
