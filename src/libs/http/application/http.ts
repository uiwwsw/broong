import { HttpResponse } from '../domain';

interface HttpProps {
  url: string;
  method?: 'GET' | 'PUT' | 'POST' | 'DEL';
}

export const Http = async <T>({ url, method = 'GET' }: HttpProps) => {
  const res = await fetch(url, { method });
  if (res.ok) return (await res.json()) as HttpResponse<T>;
  throw new Error('오류가 발생했습니다.');
};
