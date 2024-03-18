import { UiContext } from '#/useUIContext';
import { ReactNode, useState } from 'react';
import CookieJs from 'js-cookie';
interface UiProviderProps {
  children?: ReactNode;
}

const UiProvider = ({ children }: UiProviderProps) => {
  const [cache, _setCache] = useState(CookieJs.get());
  const setCache = (key: string, value: string, options?: Cookies.CookieAttributes) => {
    if (value === '') {
      CookieJs.remove(key);
    } else {
      CookieJs.set(key, value, {
        expires: 1,
        ...options,
      });
    }
    _setCache(CookieJs.get());
  };
  return (
    <UiContext.Provider
      value={{
        cache,
        setCache,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
export default UiProvider;
