export type SIZE = 'sm' | 'md' | 'lg';
export type COLOR = 'primary' | 'secondary';
export interface WithTheme<T> {
  themeColor?: COLOR;
  themeSize?: SIZE;
  componentName?: T;
}

const useTheme = <T>({ themeColor, themeSize, componentName }: WithTheme<T>) =>
  componentName
    ? `${componentName}${themeColor ? ` ${componentName}--${themeColor}` : ''}${
        themeSize ? ` ${componentName}--${themeSize}` : ''
      }`
    : '';

export default useTheme;
