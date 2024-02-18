import { ReactNode } from 'react';
interface MainProps {
  children?: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <div className="flex-auto">
      <div className="overflow-auto">{children}</div>
    </div>
  );
};

export default Main;
