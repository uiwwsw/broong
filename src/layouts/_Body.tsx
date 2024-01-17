import { useUiContext } from '@/UiProvider';
import { ReactNode } from 'react';
interface BodyProps {
  children?: ReactNode;
}
const Body = ({ children }: BodyProps) => {
  const { style } = useUiContext();
  return (
    <div className="flex min-h-screen w-full flex-col" style={style}>
      {children}
    </div>
  );
};

export default Body;
