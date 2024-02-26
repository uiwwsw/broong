// import { http } from '@package-frontend/utils';
import mockInstance from '#/instance';
import useSWR from 'swr/mutation';

export interface Arg {
  email: string;
  pw: string;
  rpw: string;
  age?: string;
}
async function fetcher(
  url: string,
  {
    arg,
  }: {
    arg: Arg;
  },
) {
  return mockInstance({
    url,
    error: { email: '중복된 아이디가 있어요. 바꿔주세요옷' } as Arg,
    logic: () => arg.email !== 'test@test.com',
  });
}

export function useSignUp() {
  return useSWR('/api/users/sign-up', fetcher);
}
