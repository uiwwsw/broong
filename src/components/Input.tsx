// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import Label from './Label';
import useTheme, { WithTheme } from '#/useTheme';
import mergeClassName from '#/mergeClassName';
import useHold from '#/useHold';
import generateRipple from '#/generateRipple';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>, WithTheme<'inp'> {
  debounce?: number;
}
const Input = ({
  componentName,
  themeColor,
  themeSize,
  children,
  className,
  type = 'text',
  onChange,
  debounce = 0,
  ...props
}: InputProps) => {
  const theme = useTheme({ componentName, themeColor, themeSize });
  const holdProps = useHold({ onHoldBefore: generateRipple });
  const [value, setValue] = useState('');
  const debounceChange = useDebounce(onChange, debounce);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceChange(e);
    setValue(e.currentTarget.value);
  };
  return (
    <label {...holdProps} className={mergeClassName(theme, className)}>
      {/* <label {...holdProps} style={{ clipPath: 'border-box' }}> */}
      <input
        {...props}
        className="peer"
        style={{ textAlign: 'inherit' }}
        onChange={handleChange}
        type={type}
        title={value}
      />
      {children ? (
        <Label componentName="lbl" themeColor={themeColor} themeSize={themeSize}>
          {children}
        </Label>
      ) : null}
    </label>
  );
};

export default Input;
