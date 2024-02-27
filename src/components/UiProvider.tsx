import { UiContext, UiSize } from '#/useUIContext';
import { ReactNode, useState } from 'react';
interface UiProviderProps {
  children?: ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
  const [title, setTitle] = useState<string>();
  const [size, setSize] = useState<Record<UiSize, number>>({ header: 0 });
  return (
    <UiContext.Provider
      value={{
        title,
        setTitle,
        size,
        setSize,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
