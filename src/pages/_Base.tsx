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
    setTitle(title);
    return () => setTitle();
  }, [title, setTitle]);
  useEffect(() => {
    setBackgroundColor(backgroundColor);
    return () => setBackgroundColor();
  }, [backgroundColor, setBackgroundColor]);
  return children;
};

export default Base;
