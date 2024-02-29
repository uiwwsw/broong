// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, ReactNode, SelectHTMLAttributes, useMemo, useRef, useState } from 'react';
import Label from '@/Label';
import { WithTheme } from '#/theme';
import useRipple from '#/useRipple';
import clsx from 'clsx';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'>, WithTheme {
  ableEmpty?: boolean;
  children?: ReactNode;
  placeholder?: string;
  delay?: number;
  defaultValue?: string;
  options?: {
    disabled?: boolean;
    value: string | number;
    label: string | number;
  }[];
}
const Select = ({
  ableEmpty = false,
  children,
  placeholder = '선택해주세요.',
  defaultValue = '',
  delay = 0,
  onChange,
  options,
  className,
  themeColor,
  themeSize,
  ...props
}: SelectProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { Ripple, ...rippleProps } = useRipple();
  const [value, setValue] = useState(defaultValue);
  const memoOption = useMemo<SelectProps['options']>(
    () => [{ value: '', label: placeholder ?? '', disabled: !ableEmpty }, ...(options ?? [])],
    [options, placeholder, ableEmpty],
  );
  const isPlaceholder = useMemo(() => value === '', [value]);
  const debounceChange = useDebounce(onChange, delay);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    debounceChange(e);
    e.target.blur();
  };
  return (
    <label
      {...rippleProps}
      className={clsx({
        'relative box-border inline-flex border': true,
        'h-8 w-32 rounded-sm text-sm': themeSize === 'sm',
        'h-10 w-52 rounded-md': themeSize === 'md',
        'h-14 w-72 rounded-lg text-lg': themeSize === 'lg',
        'border-cyan-500 bg-cyan-500 text-white': themeColor === 'primary',
        'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
        className,
        'text-gray-300': isPlaceholder,
      })}
    >
      <select
        {...props}
        className={clsx({
          'peer h-full w-full flex-1 appearance-none rounded-[inherit] bg-transparent outline-none': true,
          'p-1 py-0 pr-5': themeSize === 'sm',
          'p-2 py-1 pr-6': themeSize === 'md',
          'p-3 py-1.5 pr-8': themeSize === 'lg',
          'border-cyan-500 bg-cyan-500': themeColor === 'primary',
          'border-slate-500 bg-slate-500': themeColor === 'secondary',
        })}
        value={value}
        onChange={handleChange}
        style={{ textAlign: children ? 'right' : 'left' }}
      >
        {memoOption?.map((option) => (
          <option key={option.value} disabled={option.disabled} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {children ? (
        <Label
          ref={ref}
          className={clsx({
            'absolute h-full': true,
            'text-gray-300': isPlaceholder,
          })}
          themeColor={themeColor}
          themeSize={themeSize}
        >
          {children}
        </Label>
      ) : null}
      <i
        className={clsx({
          'pointer-events-none absolute right-[3.5%] top-1/2 origin-center -translate-y-1/3 rotate-45 before:absolute before:h-full before:w-[1px] before:bg-white after:absolute after:h-[1px] after:w-full after:bg-white peer-focus-within:-translate-y-2/3 peer-focus-within:rotate-[225deg]':
            true,
          'h-1.5 w-1.5': themeSize === 'sm',
          'h-2 w-2': themeSize === 'md',
          'h-3 w-3': themeSize === 'lg',
        })}
      />
      <i className="pointer-events-none absolute inset-0 overflow-hidden">{Ripple}</i>
    </label>
  );
};

export default Select;
