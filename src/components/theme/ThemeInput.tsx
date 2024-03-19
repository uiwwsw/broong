import Input, { InputProps } from '@/Input';
import withTheme, { WithThemeProps } from './withTheme';
import clsx from 'clsx';
import useRipple from '#/useRipple';
import { forwardRef } from 'react';
const ThemeInput = forwardRef<HTMLInputElement, InputProps & WithThemeProps>(
  ({ className, themeColor = 'primary', themeSize = 'md', ...props }, ref) => {
    const { Ripple, ...rippleProps } = useRipple();
    return (
      <div className={clsx('relative flex overflow-hidden', className)}>
        {Ripple}
        <Input
          ref={ref}
          {...props}
          {...rippleProps}
          className={clsx('flex-auto', {
            'bg-zinc-800': themeColor === 'primary',
            'p-2 py-1': themeSize === 'md',
          })}
        />
      </div>
    );
  },
);

export default withTheme(ThemeInput);
