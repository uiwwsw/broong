import { ChangeEvent, ReactNode, useState } from 'react';
import Smooth from './Smooth';

interface ValidatorProps {
  children?: ReactNode;
  validate: (value: string) => boolean | Promise<boolean>;
  debounce?: number;
}
const Validator = ({ validate, children }: ValidatorProps) => {
  const [result, setResult] = useState(false);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setResult(await validate(e.target.value));
  };
  return (
    <i className="relative" onChangeCapture={handleChange}>
      {children}
      <Smooth>
        {result && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-6 w-6 stroke-cyan-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        )}
      </Smooth>
    </i>
  );
};

export default Validator;
