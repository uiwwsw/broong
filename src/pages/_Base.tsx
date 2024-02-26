import useUiContext from '#/useUIContext';
import { ReactNode, useEffect } from 'react';
interface BaseProps {
  title?: string;
  backgroundColor?: string;
  children?: ReactNode;
}
const Base = ({ title, children }: BaseProps) => {
  const { setTitle } = useUiContext();
  useEffect(() => {
    if (!title) return;
    setTitle(title);
    return () => setTitle();
  }, [title, setTitle]);
  return children;
};

export default Base;
