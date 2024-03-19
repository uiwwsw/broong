import Button, { ButtonProps } from '@/Button';
import withTheme, { WithThemeProps } from './withTheme';
import clsx from 'clsx';
const ThemeButton = ({
  className,
  themeColor = 'primary',
  themeSize = 'md',
  ...props
}: ButtonProps & WithThemeProps) => {
  return (
    <Button
      {...props}
      className={clsx(className, {
        'bg-zinc-800': themeColor === 'primary',
        'p-2 py-1': themeSize === 'md',
      })}
    />
  );
};

export default withTheme(ThemeButton);
