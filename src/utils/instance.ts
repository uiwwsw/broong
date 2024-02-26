// import axios from 'axios';
// const instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' },

import { Response } from '!/http/domain';

// });
const mockInstance = async <T>({
  url,
  data,
  logic,
  error,
  message,
}: {
  url: string;
  data?: T;
  logic?: () => boolean;
  error?: T;
  message?: string;
}): Promise<Response<T>> => {
  console.log(url);
  await new Promise((res) => setTimeout(() => res(true), 1000));
  if (!logic || logic())
    return {
      data,
      result: true,
    };
  return {
    data: error,
    result: false,
    message,
  };
};
export default mockInstance;
