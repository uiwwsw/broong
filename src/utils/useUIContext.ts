import { createContext, useContext } from 'react';

interface ContextProps {
  title?: string;
  setTitle: (title?: string) => void;
  backgroundColor?: string;
  setBackgroundColor: (bg?: string) => void;
  underlineColor?: string;
  setUnderlineColor: (underlineColor?: string) => void;
}
export const UiContext = createContext<ContextProps>({
  title: undefined,
  setTitle: () => null,
  backgroundColor: undefined,
  setBackgroundColor: () => null,
  underlineColor: undefined,
  setUnderlineColor: () => null,
});
const useUiContext = () => useContext(UiContext);
export default useUiContext;
