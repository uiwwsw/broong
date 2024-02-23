type UseHoldProps<T> = {
  [key in string]: Record<string, (e: T) => unknown>;
};
const useMergeFn = <T>({ main, ...other }: UseHoldProps<T>) => {
  return Object.entries(main).reduce(
    (arr, [name, fn]) => ({
      ...arr,
      [name]: (e: T) => {
        fn(e);
        for (const oth of Object.values(other)) {
          oth[name]?.(e);
        }
      },
    }),
    {} as UseHoldProps<T>['main'],
  );
};

export default useMergeFn;
