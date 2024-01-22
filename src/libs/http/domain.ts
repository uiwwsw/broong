export type HttpStatus = 'success' | 'fail';
export interface HttpResponse<T> {
  code?: number;
  csrf: unknown;
  data: T;
  status: HttpStatus;
}
