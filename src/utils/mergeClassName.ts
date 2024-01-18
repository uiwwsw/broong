const mergeClassName = (...className: (string | undefined)[]) => className.filter((x) => x).join(' ');
export default mergeClassName;
