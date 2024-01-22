// /jptest?page=1
import useSWR from 'swr/mutation';
import { TestResponse } from '../domain';
import { HttpResponse } from '!/http/domain';
import { Http } from '!/http/application/http';
const cache: TestResponse['recruits'][] = [];
async function fetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      page: string;
    };
  },
) {
  const query = new URLSearchParams(arg);
  const { data } = await Http<TestResponse>({ url: `${url}?${query}` });
  cache[+arg.page] = data.recruits;
  return cache.flatMap((x) => x);
}

export function useGetList() {
  return useSWR('/api/jptest', fetcher);
}
