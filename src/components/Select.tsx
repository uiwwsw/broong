// import { MouseEvent } from 'react';

import useDebounce from '#/useDebounce';
import { ChangeEvent, ReactNode, SelectHTMLAttributes, useMemo, useState } from 'react';
import Label from './Label';
import useTheme, { WithTheme } from '#/useTheme';
import mergeClassName from '#/mergeClassName';
import useRipple from '#/useRipple';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'>, WithTheme<'slt'> {
  children?: ReactNode;
  placeholder?: string;
  debounce?: number;
  defaultValue?: string;
  options?: {
    disabled?: boolean;
    value: string;
    label: string;
  }[];
}
const Select = ({
  children,
  placeholder = '선택해주세요.',
  defaultValue = '',
  debounce = 0,
  onChange,
  options,
  className,
  componentName,
  themeColor,
  themeSize,
  ...props
}: SelectProps) => {
  const theme = useTheme({ componentName, themeColor, themeSize });
  const { Ripple, ...rippleProps } = useRipple();
  const [value, setValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const memoOption = useMemo<SelectProps['options']>(
    () => [{ value: '', label: placeholder ?? '', disabled: true }, ...(options ?? [])],
    [options, placeholder],
  );
  const isPlaceholder = useMemo(() => value === '', [value]);
  const debounceChange = useDebounce(onChange, debounce);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    debounceChange(e);
    e.target.blur();
  };
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  return (
    <label {...rippleProps} className={mergeClassName(theme, className, isPlaceholder ? ' slt--placeholder' : '')}>
      <div>
        <select
          {...props}
          className="peer"
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {memoOption?.map((option) => (
            <option key={option.value} disabled={option.disabled} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {children ? (
          <Label componentName="lbl" themeColor={themeColor} themeSize={themeSize}>
            {children}
          </Label>
        ) : null}
      </div>
      {focus ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      )}
      <i className="ripple--wrap">{Ripple}</i>
    </label>
  );
};

export default Select;
