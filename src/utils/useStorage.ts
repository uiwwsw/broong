import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
const useStorage = <T>() => {
  const location = useLocation();
  const key = useMemo(() => location.pathname, [location]);
  const [state, setState] = useState<Partial<T>>();
  const adapterSetState = (value?: Partial<T>) => {
    setState(value);
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  };
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value === null) return;

    const parseValue: Partial<T> = JSON.parse(value);
    setState(parseValue);
  }, [key, setState]);
  return [state, adapterSetState] as [Partial<T> | undefined, (value?: Partial<T>) => void];
};

export default useStorage;
