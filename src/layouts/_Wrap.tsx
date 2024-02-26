import { ReactNode } from 'react';
interface WrapProps {
  children?: ReactNode;
}
const Wrap = ({ children }: WrapProps) => {
  return <div className={`flex min-h-screen w-full flex-auto flex-col`}>{children}</div>;
};

export default Wrap;
