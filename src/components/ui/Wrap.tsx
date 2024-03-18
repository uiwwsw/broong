import { ReactNode } from 'react';
interface WrapProps {
  children?: ReactNode;
}
const Wrap = ({ children }: WrapProps) => {
  return (
    <div className="relative m-auto flex min-h-screen w-full max-w-lg flex-auto flex-col bg-zinc-900 p-8">
      {children}
    </div>
  );
};

export default Wrap;
