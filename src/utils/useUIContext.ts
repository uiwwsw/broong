import { createContext, useContext } from 'react';
export type UiSize = 'header';
interface ContextProps {
  cache?: {
    [key: string]: string;
  };
  setCache: (key: string, value: string, options?: Cookies.CookieAttributes | undefined) => void;
}
export const UiContext = createContext<ContextProps>({
  cache: undefined,
  setCache: () => null,
});
const useUiContext = () => useContext(UiContext);
export default useUiContext;
