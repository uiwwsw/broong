// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import Label from '@/Label';
import useTheme, { WithTheme } from '#/useTheme';
import mergeClassName from '#/mergeClassName';
import useRipple from '#/useRipple';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, WithTheme<'inp'> {
  debounce?: number;
  onSubmit?: (e?: unknown) => void;
}
const Input = ({
  componentName,
  themeColor,
  themeSize,
  children,
  className,
  type = 'text',
  onChange,
  onSubmit,
  debounce = 0,
  ...props
}: InputProps) => {
  const theme = useTheme({ componentName, themeColor, themeSize });
  const { Ripple, ...rippleProps } = useRipple();
  const [value, setValue] = useState('');
  const debounceChange = useDebounce(onChange, debounce);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceChange(e);
    setValue(e.currentTarget.value);
  };
  return (
    <label {...rippleProps} className={mergeClassName(theme, className)}>
      {/* <label {...holdProps} style={{ clipPath: 'border-box' }}> */}
      <input
        {...props}
        className="peer select-none"
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
      <i className="ripple--wrap">{Ripple}</i>
    </label>
  );
};

export default Input;
