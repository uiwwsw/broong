import { ComponentType } from 'react';
export interface WithThemeProps {
  themeColor?: 'primary';
  themeSize?: 'md';
}
const withTheme = <P,>(WrappedComponent: ComponentType<P & WithThemeProps>) => {
  return (props: P & WithThemeProps) => {
    return <WrappedComponent {...props} />;
  };
};

export default withTheme;
