import { ReactNode, createContext, useContext, useState } from 'react';
interface UiProviderProps {
  children?: ReactNode;
}
interface ContextProps {
  title?: string;
  setTitle: (title?: string) => void;
  backgroundColor?: string;
  setBackgroundColor: (bg?: string) => void;
  underlineColor?: string;
  setUnderlineColor: (underlineColor: string) => void;
}
const UiContext = createContext<ContextProps>({
  title: undefined,
  setTitle: () => null,
  backgroundColor: undefined,
  setBackgroundColor: () => null,
  underlineColor: undefined,
  setUnderlineColor: () => null,
});
export const UiProvider = ({ children }: UiProviderProps) => {
  const [title, setTitle] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [underlineColor, setUnderlineColor] = useState<string>();
  return (
    <UiContext.Provider
      value={{
        title,
        setTitle,
        backgroundColor,
        setBackgroundColor,
        underlineColor,
        setUnderlineColor,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
export const useUiContext = () => useContext(UiContext);
