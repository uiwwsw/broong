import { useUiContext } from '@/UiProvider';
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
  }, [title]);
  useEffect(() => {
    setBackgroundColor(backgroundColor);
    return () => setBackgroundColor();
  }, [backgroundColor]);
  return children;
};

export default Base;
