import { useEffect, useState } from 'react';

const useDebounceValue = (value: string, delay: number = 100) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 후에 value를 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함수에서는 timeout을 clear
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value 또는 delay가 변경될 때마다 실행

  return debouncedValue;
};

export default useDebounceValue;
