import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}
const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="mt-4 first-of-type:mt-0">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
};
export default Section;
