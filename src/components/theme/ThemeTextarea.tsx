import withTheme, { WithThemeProps } from './withTheme';
import clsx from 'clsx';
import useRipple from '#/useRipple';
import Textarea, { TextareaProps } from '@/Textarea';
import { forwardRef } from 'react';
const ThemeTextarea = forwardRef<HTMLTextAreaElement, TextareaProps & WithThemeProps>(
  ({ className, themeColor = 'primary', themeSize = 'md', ...props }, ref) => {
    const { Ripple, ...rippleProps } = useRipple();
    return (
      <div className={clsx('relative flex overflow-hidden', className)}>
        {Ripple}
        <Textarea
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

export default withTheme(ThemeTextarea);
