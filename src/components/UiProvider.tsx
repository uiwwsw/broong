import { UiContext } from '#/useUIContext';
import { ReactNode, useState } from 'react';
interface UiProviderProps {
  children?: ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
  const [title, setTitle] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>('bg-gray-200');
  const [underlineColor, setUnderlineColor] = useState<string | undefined>('bg-teal-700');
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
