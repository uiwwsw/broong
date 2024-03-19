import Button, { ButtonProps } from '@/Button';
import withTheme, { WithThemeProps } from './withTheme';
import clsx from 'clsx';
import useRipple from '#/useRipple';
const ThemeButton = ({
  className,
  themeColor = 'primary',
  themeSize = 'md',
  ...props
}: ButtonProps & WithThemeProps) => {
  const { Ripple, ...rippleProps } = useRipple();
  return (
    <div className={clsx('relative flex overflow-hidden', className)}>
      {Ripple}
      <Button
        {...props}
        {...rippleProps}
        className={clsx('flex-auto', {
          'bg-zinc-800': themeColor === 'primary',
          'p-2 py-1': themeSize === 'md',
        })}
      />
    </div>
  );
};

export default withTheme(ThemeButton);
