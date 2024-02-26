// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import Label from '@/Label';
import useTheme, { WithTheme } from '#/useTheme';
import mergeClassName from '#/mergeClassName';
import useRipple from '#/useRipple';
import Button from './Button';
import Smooth from './Smooth';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, WithTheme {
  debounce?: number;
  reverseLabel?: boolean;
}
const Input = forwardRef<HTMLLabelElement, InputProps>(
  (
    {
      reverseLabel = false,
      componentName = 'inp',
      themeColor,
      themeSize,
      children,
      className,
      type = 'text',
      onChange,
      debounce = 0,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const hasClearBtn = type === 'search';

    const theme = useTheme({ componentName, themeColor, themeSize });
    const { Ripple, ...rippleProps } = useRipple();
    const [value, setValue] = useState('');
    const debounceChange = useDebounce(onChange, debounce);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      if (maxLength) e.currentTarget.value = newValue.substring(0, maxLength);
      // if (newValue === value) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   return;
      // }
      debounceChange(e);
      setValue(newValue);
    };
    const handleClear = () => {};
    return (
      <label {...rippleProps} ref={ref} className={mergeClassName(theme, className)}>
        {/* <label {...holdProps} style={{ clipPath: 'border-box' }}> */}
        <input
          {...props}
          className="inp__text peer select-none"
          style={{ textAlign: children ? 'right' : 'left' }}
          onChange={handleChange}
          type={type}
          title={value}
        />
        {children ? (
          <Label reverse={reverseLabel} themeColor={themeColor} themeSize={themeSize}>
            {children}
          </Label>
        ) : null}

        <Smooth>
          {hasClearBtn && (
            <Button componentName="" onClick={handleClear} className="inp__btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          )}
        </Smooth>
        <i className="ripple--wrap">{Ripple}</i>
      </label>
    );
  },
);

export default Input;
