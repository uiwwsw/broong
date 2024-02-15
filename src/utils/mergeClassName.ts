const mergeClassName = (...className: (string | false | undefined)[]) => className.filter((x) => x).join(' ');
export default mergeClassName;
