export interface Response<T> {
  data?: T;
  result: boolean;
  message?: string;
}
