import { useUiContext } from '@/UiProvider';
import { ReactNode, useEffect } from 'react';
interface WithTitleProps {
  title?: string;
  children?: ReactNode;
}
const WithTitle = ({ title, children }: WithTitleProps) => {
  const { setTitle } = useUiContext();
  useEffect(() => {
    title && setTitle(title);
    return () => setTitle('');
  }, [title]);
  return <div>{children}</div>;
};

export default WithTitle;
