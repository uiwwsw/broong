// import { MouseEvent } from 'react';

import { WithTheme } from '#/theme';
import clsx from 'clsx';
import { ReactNode, forwardRef } from 'react';

interface LabelProps extends WithTheme {
  children?: ReactNode;
  className?: string;
  reverse?: boolean;
}
const Label = forwardRef<HTMLParagraphElement, LabelProps>(
  ({ className, children, reverse = false, themeSize, themeColor }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(
          {
            "pointer-events-none flex items-center border-inherit bg-inherit transition-transform after:content-[':'] peer-focus-within:absolute peer-focus-within:left-[-1px] peer-focus-within:z-10 peer-focus-within:h-full peer-focus-within:translate-x-0 peer-focus-within:border":
              true,
            'peer-focus-within:translate-y-[calc(-100%+6px)] peer-focus-within:rounded-b-none': !reverse,
            'peer-focus-within:translate-y-[calc(100%-6px)] peer-focus-within:rounded-t-none': reverse,
            'rounded-sm pl-1 peer-focus-within:pr-1': themeSize === 'sm',
            'rounded-md pl-2 peer-focus-within:pr-2': themeSize === 'md',
            'rounded-lg pl-3 peer-focus-within:pr-3': themeSize === 'lg',
            'border-cyan-500 bg-cyan-500 text-white': themeColor === 'secondary',
            'border-slate-500 bg-slate-500 text-white': themeColor === 'secondary',
          },
          className,
        )}
      >
        <span>{children}</span>
      </p>
    );
  },
);

export default Label;
