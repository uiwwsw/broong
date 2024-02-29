export const sizeArr = ['sm', 'md', 'lg'] as const;
export const colorArr = ['primary', 'secondary'] as const;
export type SIZE = (typeof sizeArr)[number];
export type COLOR = (typeof colorArr)[number];
export interface WithTheme<T extends string = ''> {
  themeColor?: COLOR;
  themeSize?: SIZE;
  suffix?: T;
}
