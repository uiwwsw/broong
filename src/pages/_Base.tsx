import useUiContext from '#/useUIContext';
import { ReactNode, useEffect } from 'react';
interface BaseProps {
  title?: string;
  backgroundColor?: string;
  children?: ReactNode;
}
const Base = ({ title, backgroundColor, children }: BaseProps) => {
  const { setTitle, setBackgroundColor } = useUiContext();
  useEffect(() => {
    if (!title) return;
    setTitle(title);
    return () => setTitle();
  }, [title, setTitle]);
  useEffect(() => {
    if (!backgroundColor) return;
    setBackgroundColor(backgroundColor);
    return () => setBackgroundColor();
  }, [backgroundColor, setBackgroundColor]);
  return children;
};

export default Base;
