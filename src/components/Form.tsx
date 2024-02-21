import { ChangeEvent, FormEvent, ReactElement, cloneElement, useMemo, useRef, useState } from 'react';
import Smooth from './Smooth';
import Toast from './Toast';
import Loader from './Loader';
import Tooltip from './Tooltip';
type Validate = (value?: string, values?: Record<string, string>) => boolean;
interface InfoProps {
  isRequire?: boolean;
  isValid?: boolean;
  message?: string;
}
const Info = ({ isRequire, isValid, message }: InfoProps) => {
  const isDirty = isValid !== undefined || message;
  return (
    <>
      <Tooltip
        slot={
          <Smooth
            className={`${
              !isDirty ? '[&>*]:stroke-slate-400' : isValid ? '[&>*]:stroke-green-700' : '[&>*]:stroke-red-700'
            }`}
          >
            {isRequire ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            )}
          </Smooth>
        }
      >
        {isRequire
          ? !isDirty
            ? '필수 입력 사항입니다.'
            : isValid
              ? '올바른 값입니다.'
              : '값을 확인해 주세요.'
          : !isDirty
            ? '선택 사항입니다.'
            : isValid
              ? '올바른 값입니다.'
              : '값을 확인해 주세요. 아예 입력하지 않아도 가입할 수 있습니다.'}
      </Tooltip>
      <Smooth>{message && isValid === false && <p className="text-red-700">{message}</p>}</Smooth>
    </>
  );
};

interface FormProps {
  width?: number;
  children?: ReactElement[];
  validations: Record<string, Validate>;
  messages?: Record<string, string>;
  debounce?: number;
  requires?: string[];
  onSubmit?: (values: Record<string, string>) => Promise<unknown> | unknown | void;
  button?: ReactElement;
}
const Form = ({ width = 300, requires, validations, messages, children, onSubmit, button }: FormProps) => {
  const [loading, setLoading] = useState(false);
  const values = useRef<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const requireKeys: string[] = useMemo(
    () => requires ?? children?.map((x) => x.props.name) ?? [],
    [requires, children],
  );
  const isComplete = useMemo(() => {
    if (requireKeys.every((x) => results[x]) && !Object.values(results).filter((x) => x === false).length) return true;
    return false;
  }, [results, requireKeys]);
  const hasError = useMemo(
    () =>
      !!Object.entries(error).filter(([key]) => !results[key]).length ||
      !!Object.values(results).filter((x) => x === false).length,
    [results, error],
  );
  const message = useMemo(() => {
    const key = Object.entries(results).find(([_, value]) => !value)?.[0];
    if (key) return messages![key]!;
    return '';
  }, [messages, results]);
  const handleValidate = (e: ChangeEvent<HTMLFormElement>) => {
    const currentKey = e.target.name;
    const currentValue = e.target.value;
    const validation = validations[currentKey];
    values.current = {
      ...values.current,
      [currentKey]: currentValue,
    };
    const pass = !requireKeys.includes(currentKey) && values.current[currentKey] === '';
    const res = validation(currentValue, values.current);

    // setResults((prev) => ({ ...prev, [currentKey]: res }));
    setResults((prev) => {
      if (pass) {
        delete prev[currentKey];
        return {
          ...prev,
        };
      }

      const keys = Object.keys(prev);

      return {
        ...keys.reduce(
          (a, key) => {
            // ([key, value]) => (value ? validations[key](currentValue, values.current) : false)
            return {
              ...a,
              [key]: validations[key](values.current[key], values.current),
            };
          },
          {} as Record<string, boolean>,
        ),
        [currentKey]: res,
      };
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit && isComplete) {
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
    }
    // requires
    // results
    requireKeys
      .filter((x) => !results[x])
      .forEach((x) => {
        setError((prev) => ({ ...prev, [x]: '필수항목입니다.' }));
      });
  };

  return (
    <form onChangeCapture={handleValidate} className="[&>*+*]:mt-8" onSubmit={handleSubmit}>
      {children?.map((x, i) => (
        <div key={i} className="flex items-center gap-3">
          <Loader press="onKeyDown" show={loading}>
            <div style={{ width }} className="[&>*]:w-full">
              {x}
            </div>
          </Loader>

          <Info
            message={error[x.props.name]}
            isRequire={requireKeys.includes(x.props.name)}
            isValid={results[x.props.name]}
          />
        </div>
      ))}
      <Toast themeSize="lg" show={!!message}>
        {message}
      </Toast>
      <div className="flex items-center gap-3">
        <div className="flex justify-end" style={{ minWidth: width }}>
          <Loader show={loading}>{button && cloneElement(button, { disabled: hasError })}</Loader>
        </div>
        <Smooth>
          {isComplete && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 stroke-green-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          )}
        </Smooth>
      </div>
    </form>
  );
};

export default Form;
