export const sizeArr = ['sm', 'md', 'lg'] as const;
export const colorArr = ['primary', 'secondary'] as const;
export type SIZE = (typeof sizeArr)[number];
export type COLOR = (typeof colorArr)[number];
export interface WithTheme<T extends string = ''> {
  themeColor?: COLOR;
  themeSize?: SIZE;
  suffix?: T;
}

interface GetClassName<T extends string> extends WithTheme<T> {
  className: Record<COLOR | SIZE | 'default' | T, string>;
}
const getClassName = <T extends string>({
  className,
  themeColor = 'primary',
  themeSize = 'md',
  suffix,
}: GetClassName<T>) =>
  className.default +
  (className[themeColor] ? ` ${className[themeColor]}` : '') +
  (className[themeSize] ? ` ${className[themeSize]}` : '') +
  (suffix && className[suffix] ? ` ${className[suffix]}` : '');

export default getClassName;
