import { ReactNode } from 'react';
interface MainProps {
  children?: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return <div className="flex-auto">{children}</div>;
};

export default Main;
