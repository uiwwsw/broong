// import { MouseEvent } from 'react';

import { FocusEvent, MouseEvent, forwardRef, useEffect, useRef, useState } from 'react';
import Input, { InputProps } from './Input';
import Button from './Button';
import Smooth from './Smooth';
import clsx from 'clsx';
interface SearchProps extends InputProps {
  onChange?: (value: string) => void;
}
const Search = forwardRef<HTMLLabelElement, SearchProps>(
  ({ onChange, themeSize, themeColor, onFocus, onBlur, className, ...props }, ref) => {
    // const labelRef = useRef<HTMLLabelElement>(null);
    const [value, setValue] = useState<string | number>('');
    const [focus, setFocus] = useState(false);
    const handleChange = (newValue: string) => {
      setValue(newValue);
      onChange && onChange(newValue);
    };
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setFocus(true);
      onFocus && onFocus(e);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      onBlur && onBlur(e);
    };
    const handleClear = (e: MouseEvent) => {
      setValue('');
      onChange && onChange('');
      e.preventDefault();
      e.stopPropagation();
    };
    useEffect(() => {
      if (typeof props.value === 'string' || typeof props.value === 'number') setValue(props.value);
    }, [props.value]);
    return (
      <div
        className={clsx(
          {
            'relative inline-block': true,
            'w-32': themeSize === 'sm',
            'w-52': themeSize === 'md',
            'w-72': themeSize === 'lg',
          },
          className,
        )}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        <Input
          {...props}
          ref={ref}
          className={clsx({
            'peer w-[inherit] transition-all': true,
            'pr-8': focus,
          })}
          themeColor={themeColor}
          themeSize={themeSize}
          value={value}
          onChange={handleChange}
        />
        <Smooth>
          {focus && (
            <Button
              type="button"
              themeColor={themeColor}
              themeSize={themeSize}
              className="!absolute right-2 top-1/2 z-10 -translate-y-1/2 overflow-hidden !p-0"
              onClick={handleClear}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="h-6 w-6 stroke-white"
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
      </div>
    );
  },
);

export default Search;
