import { ReactNode } from 'react';

interface PageProps {
  name: string;
  children?: ReactNode;
}
const Page = ({ children, name }: PageProps) => {
  return (
    <>
      <h1 className="sr-only">{name}</h1>
      {children}
    </>
  );
};

export default Page;
