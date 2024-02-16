const mergeClassName = (...classNames: Array<string | undefined | false>) =>
  classNames
    .filter((x, i, arr): x is string => arr.indexOf(x) === i && typeof x === 'string' && x !== '') // 명시적으로 빈 문자열이 아닌 문자열을 체크
    .map((x) => x.trim())
    .join(' ');
//   classNames
//     .filter(Boolean)
//     .map((x) => (x as string).trim())
//     .join(' ');
export default mergeClassName;
