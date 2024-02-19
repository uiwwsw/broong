import { ChangeEvent, FormEvent, ReactElement, cloneElement, useMemo, useRef, useState } from 'react';
import Smooth from './Smooth';
import Toast from './Toast';
type Validate = (value?: string, values?: Record<string, string>) => boolean;
interface FormProps {
  children?: ReactElement[];
  validations: Record<string, Validate>;
  messages?: Record<string, string>;
  debounce?: number;
  requires?: string[];
  onSubmit?: (values: Record<string, string>) => Promise<unknown> | unknown | void;
  button?: ReactElement;
}
const enum STATE {
  INIT,
  COMPLETE,
  ERROR,
}
const Form = ({ requires, validations, messages, children, onSubmit, button }: FormProps) => {
  const length = children?.length ?? 0;
  const [loading, setLoading] = useState(false);
  const values = useRef<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const state: STATE = useMemo(() => {
    const values = Object.values(results).filter(Boolean);
    const valuesLength = values.length;
    if (valuesLength === 0 || length === 0) return STATE.INIT;

    if (requires ? requires.every((x) => results[x]) : valuesLength === length) return STATE.COMPLETE;
    return STATE.ERROR;
  }, [results, requires]);
  const message = useMemo(() => {
    const key = Object.entries(results).find(([_, value]) => !value)?.[0];
    if (key) return messages![key]!;
    return '';
  }, [state, messages, results]);
  const handleValidate = (e: ChangeEvent<HTMLFormElement>) => {
    const currentKey = e.target.name;
    const currentValue = e.target.value;
    const validation = validations[currentKey];
    values.current = {
      ...values.current,
      [currentKey]: currentValue,
    };
    const res = validation(currentValue, values.current);
    // setResults((prev) => ({ ...prev, [currentKey]: res }));
    setResults((prev) => {
      const entries = Object.entries(prev);
      return {
        ...entries.reduce((a, [key, value]) => {
          // ([key, value]) => (value ? validations[key](currentValue, values.current) : false)
          return {
            ...a,
            [key]: value ? validations[key](values.current[key], values.current) : false,
          };
        }, {}),
        [currentKey]: res,
      };
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit && state === STATE.COMPLETE) {
      setError({});
      setLoading(true);
      const res = await onSubmit(values.current);
      setLoading(false);
      if (res !== true) {
        const newResults = { ...results };
        for (const [key] of Object.entries(results)) {
          if ((res as typeof results)[key] === undefined) continue;
          newResults[key] = false;
        }
        setResults(newResults);
        setError(res as typeof error);
        return false;
      }
      return true;
    } else if (Object.keys(results).length === 0) {
      setError({ button: '작성을 완료해주세요.' });
    }
  };

  return (
    <form onChangeCapture={handleValidate} className="[&>*+*]:mt-8" onSubmit={handleSubmit}>
      {state}
      {children?.map((x, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="relative">
            {cloneElement(x, { disabled: loading })}
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
          <p className="text-red-700 empty:hidden">{error[x.props.name]}</p>
        </div>
      ))}
      <Toast show={!!message}>{message}</Toast>
      <div className="flex items-center gap-3">
        {button && cloneElement(button, { show: loading })}
        <p className="text-red-700 empty:hidden">{error.button}</p>
      </div>
    </form>
  );
};

export default Form;
