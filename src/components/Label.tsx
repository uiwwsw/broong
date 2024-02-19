// import { MouseEvent } from 'react';

import mergeClassName from '#/mergeClassName';
import useTheme, { WithTheme } from '#/useTheme';
import { ReactNode } from 'react';

interface LabelProps extends WithTheme<'lbl'> {
  children?: ReactNode;
  className?: string;
}
const Label = ({ className, children, componentName = 'lbl', ...props }: LabelProps) => {
  const theme = useTheme({ ...props, componentName });

  return (
    <p className={mergeClassName(theme, className)}>
      <span>{children}</span>
    </p>
  );
};

export default Label;
