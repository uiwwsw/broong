export const sizeArr = ['sm', 'md', 'lg'] as const;
export const colorArr = ['primary', 'secondary'] as const;
export type SIZE = (typeof sizeArr)[number];
export type COLOR = (typeof colorArr)[number];
export interface WithTheme {
  themeColor?: COLOR;
  themeSize?: SIZE;
  componentName?: string;
  suffix?: string;
}

const useTheme = ({ themeColor = 'primary', themeSize = 'md', componentName, suffix }: WithTheme) =>
  componentName
    ? `${componentName}${themeColor ? ` ${componentName}--${themeColor}` : ''}${
        themeSize ? ` ${componentName}--${themeSize}` : ''
      }${suffix ? ` ${componentName}--${suffix}` : ''}`
    : '';

export default useTheme;
