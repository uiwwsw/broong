import useUiContext from '#/useUIContext';
import { ReactNode } from 'react';
interface WrapProps {
  children?: ReactNode;
}
const Wrap = ({ children }: WrapProps) => {
  const { backgroundColor } = useUiContext();
  return (
    <div className="flex min-h-screen w-full flex-auto flex-col" style={{ backgroundColor }}>
      {children}
    </div>
  );
};

export default Wrap;
