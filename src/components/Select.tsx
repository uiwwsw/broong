// import { MouseEvent } from 'react';

import generateRipple from '#/generateRipple';
import useDebounce from '#/useDebounce';
import { ChangeEvent, SelectHTMLAttributes, useMemo, useState } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
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
  placeholder = '선택해주세요.',
  defaultValue = '',
  debounce = 0,
  onChange,
  options,
  className,
  ...props
}: SelectProps) => {
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
    <label
      className={className + (isPlaceholder ? ' is-placeholder' : '')}
      onTouchStart={generateRipple}
      onMouseDown={generateRipple}
    >
      <select {...props} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}>
        {memoOption?.map((option) => (
          <option selected={option.value === value} disabled={option.disabled} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
    </label>
  );
};

export default Select;
