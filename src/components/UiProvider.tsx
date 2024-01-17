import { CSSProperties, ReactNode, createContext, useContext, useState } from 'react';
interface UiProviderProps {
  children?: ReactNode;
}
interface ContextProps {
  title?: string;
  setTitle: (title?: string) => void;
  style?: CSSProperties;
  setStyle: (style?: CSSProperties) => void;
  underlineColor?: string;
  setUnderlineColor: (underlineColor: string) => void;
}
const UiContext = createContext<ContextProps>({
  title: undefined,
  setTitle: () => null,
  style: undefined,
  setStyle: () => null,
  underlineColor: undefined,
  setUnderlineColor: () => null,
});
export const UiProvider = ({ children }: UiProviderProps) => {
  const [title, setTitle] = useState<string>();
  const [style, setStyle] = useState<CSSProperties>();
  const [underlineColor, setUnderlineColor] = useState('');

  return (
    <UiContext.Provider
      value={{
        title,
        setTitle,
        style,
        setStyle,
        underlineColor,
        setUnderlineColor,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
export const useUiContext = () => useContext(UiContext);
