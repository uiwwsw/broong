// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import Label from '@/Label';
import clsx from 'clsx';
import { WithTheme } from '#/theme';
import useRipple from '#/useRipple';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>, WithTheme {
  delay?: number;
  reverseLabel?: boolean;
  onChange?: (value: string) => void;
}

const Input = forwardRef<HTMLLabelElement, InputProps>(
  (
    {
      reverseLabel = false,
      themeColor,
      themeSize,
      children,
      className,
      type = 'text',
      onChange,
      delay = 0,
      maxLength,
      ...props
    },
    ref,
  ) => {
    // const theme = getClassName({
    //   className: {
    //     default: '',
    //   },
    //   themeColor,
    //   themeSize,
    // });
    const { Ripple, ...rippleProps } = useRipple();
    const [value, setValue] = useState('');
    const debounceChange = useDebounce(onChange, delay);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      if (maxLength) e.currentTarget.value = newValue.substring(0, maxLength);
      // if (newValue === value) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   return;
      // }
      debounceChange(newValue);
      setValue(newValue);
      e.preventDefault();
      e.stopPropagation();
    };
    return (
      <label
        {...rippleProps}
        ref={ref}
        className={clsx({
          className,
          'relative box-border inline-flex flex-row-reverse items-center border': true,
          'h-8 w-32 rounded-sm text-sm': themeSize === 'sm',
          'h-10 w-52 rounded-md': themeSize === 'md',
          'h-14 w-72 rounded-lg text-lg': themeSize === 'lg',
          'border-cyan-500 bg-cyan-500 text-white': themeColor === 'primary',
          'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
        })}
      >
        {/* <label {...holdProps} style={{ clipPath: 'border-box' }}> */}
        <input
          {...props}
          className={clsx({
            'peer h-full w-full flex-1 select-none truncate bg-transparent text-left outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-search-cancel-button]:hidden':
              true,
            'p-1 py-0': themeSize === 'sm',
            'p-2 py-1': themeSize === 'md',
            'p-3 py-1.5': themeSize === 'lg',
            'placeholder:text-white placeholder:text-opacity-60': themeColor === 'primary',
            'text-right': children,
          })}
          onChange={handleChange}
          type={type}
          title={value}
        />
        {children ? (
          <Label reverse={reverseLabel} themeColor={themeColor} themeSize={themeSize}>
            {children}
          </Label>
        ) : null}
        <i className="ripple--wrap">{Ripple}</i>
      </label>
    );
  },
);

export default Input;
