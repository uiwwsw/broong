import { ComponentType, Ref, forwardRef } from 'react';
export interface WithThemeProps {
  themeColor?: 'primary' | false;
  themeSize?: 'md' | false;
}
const withTheme = <P,>(WrappedComponent: ComponentType<P & WithThemeProps>) => {
  // Use React.forwardRef to pass the ref through the HOC to the WrappedComponent
  const WithThemeForwardRef = (props: P & WithThemeProps, ref: Ref<P>) => {
    // Forward the ref to the WrappedComponent
    return <WrappedComponent {...props} ref={ref} />;
  };

  // The displayName property helps with debugging by showing the HOC's name in DevTools.
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithThemeForwardRef.displayName = `withTheme(${componentName})`;

  return forwardRef(WithThemeForwardRef);
};

export default withTheme;
