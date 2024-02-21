// import { MouseEvent } from 'react';

import mergeClassName from '#/mergeClassName';
import useTheme, { WithTheme } from '#/useTheme';
import { ReactNode, forwardRef } from 'react';

interface LabelProps extends WithTheme {
  children?: ReactNode;
  className?: string;
  reverse?: boolean;
}
const Label = forwardRef<HTMLParagraphElement, LabelProps>(
  ({ className, children, componentName = 'lbl', reverse = false, ...props }, ref) => {
    const theme = useTheme({ ...props, componentName, suffix: reverse ? 'down' : 'up' });

    return (
      <p ref={ref} className={mergeClassName(theme, className)}>
        <span>{children}</span>
      </p>
    );
  },
);

export default Label;
