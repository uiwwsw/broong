type UseHoldProps = {
  [key in string]: Record<string, Function>;
};
const useMergeFn = ({ main, ...other }: UseHoldProps) => {
  return Object.entries(main).reduce(
    (arr, [name, fn]) => ({
      ...arr,
      [name]: <T>(e: T) => {
        fn(e);
        for (const oth of Object.values(other)) {
          oth[name]?.(e);
        }
      },
    }),
    {} as UseHoldProps['main'],
  );
};

export default useMergeFn;
