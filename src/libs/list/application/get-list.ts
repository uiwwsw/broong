// /jptest?page=1
import useSWR from 'swr/mutation';

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
  const res = await fetch(`${url}?${query}`, { method: 'GET' });

  if (res.ok) return await res.json();
  throw new Error('블라블라');
}

export function useGetList() {
  return useSWR('/api/jptest', fetcher);
}
