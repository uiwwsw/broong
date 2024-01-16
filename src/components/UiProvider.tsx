import { ReactNode, createContext, useContext, useState } from 'react';
interface UiProviderProps {
  children?: ReactNode;
}
interface ContextProps {
  title?: string;
  setTitle: (title: string) => void;
  underlineColor?: string;
  setUnderlineColor: (underlineColor: string) => void;
}
const UiContext = createContext<ContextProps>({
  title: undefined,
  setTitle: () => null,
  underlineColor: undefined,
  setUnderlineColor: () => null,
});
export const UiProvider = ({ children }: UiProviderProps) => {
  const [title, setTitle] = useState('');
  const [underlineColor, setUnderlineColor] = useState('');
  console.log(children, 'dawdawdawdaw');

  return (
    <UiContext.Provider
      value={{
        title,
        setTitle,
        underlineColor,
        setUnderlineColor,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
export const useUiContext = () => useContext(UiContext);
