import { createContext, useContext } from 'react';
export type UiSize = 'header';
interface ContextProps {
  title?: string;
  setTitle: (title?: string) => void;
  size?: Record<UiSize, number>;
  setSize: (style: Record<string, number>) => void;
}
export const UiContext = createContext<ContextProps>({
  title: undefined,
  setTitle: () => null,
  size: undefined,
  setSize: () => null,
});
const useUiContext = () => useContext(UiContext);
export default useUiContext;
