import { useUiContext } from '@/UiProvider';
import { CSSProperties, ReactNode, useEffect } from 'react';
interface BaseProps {
  title?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
const Base = ({ title, style, children }: BaseProps) => {
  const { setTitle, setStyle } = useUiContext();
  useEffect(() => {
    title && setTitle(title);
    return () => setTitle();
  }, [title]);
  useEffect(() => {
    console.log(style, 'dwadawdad');
    style && setStyle(style);
    return () => setStyle();
  }, [style]);
  return children;
};

export default Base;
