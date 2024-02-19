import { ChangeEvent, ReactElement, useState } from 'react';
import Smooth from './Smooth';
type Validate = (value: string) => boolean | Promise<boolean>;
interface FormProps {
  children?: ReactElement[];
  validations: Record<string, Validate>;
  debounce?: number;
}

const Form = ({ validations, children }: FormProps) => {
  const [results, setResults] = useState<Record<string, boolean>>({});
  const handleChange = async (e: ChangeEvent<HTMLFormElement>) => {
    const key = e.target.name;
    const validation = validations[key];
    const res = await validation(e.target.value);
    setResults((prev) => ({ ...prev, [key]: res }));
  };
  return (
    <form onChangeCapture={handleChange}>
      {children?.map((x) => (
        <div className="relative">
          {x}
          <Smooth>
            {results[x.props.name] && (
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
        </div>
      ))}
    </form>
  );
};

export default Form;
