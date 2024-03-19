import { MyResponse } from 'library';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface HttpRequestParams<T> {
  url: string;
  arg?: T;
  method?: HttpMethod;
}

async function http<Q = unknown, R = unknown>({
  url,
  arg,
  method = 'GET',
}: HttpRequestParams<Q>): Promise<MyResponse<R>> {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const config: RequestInit = {
    method,
    headers,
  };

  if (arg) {
    switch (method) {
      case 'GET':
        url += '?' + new URLSearchParams(arg).toString();
        break;
      case 'POST':
      case 'PUT':
        config.body = JSON.stringify(arg);
        break;
      case 'PATCH':
      case 'DELETE':
      default:
        break;
    }
  }

  try {
    const response = await fetch(url, config);
    const json = await response.json();
    if (!response.ok) {
      const error = new Error();
      error.message = json?.message;
      throw error;
    }

    // Assuming all responses are JSON. Adjust if needed.
    return json;
  } catch (error) {
    console.error('HTTP Request failed', error);
    throw error;
  }
}
// export const toText = async (res: Response) => {
//   const text = await res.text();
//   return text;
// };
// export const toBlob = async (res: Response) => {
//   const blob = await res.blob();
//   return blob;
// };
// export const toJson = async <T>(res: Response) => {
//   const json = (await res.json()) as STResponse<T>;
//   if (json?.data) return json.data as STResponseSuccess<T>;
//   if (json.message) throw new HttpError(json.message, res);
//   return json as STResponseSuccess<T>;
// };
export default http;
// export class HttpError extends Error implements STResponseFailed {
//   status: number;
//   statusText: string;
//   static unAuth(status: number) {
//     return [401, 403].includes(status);
//   }
//   get type() {
//     switch (this.status) {
//       case 404:
//         return 5;
//       default:
//         return Math.floor(this.status / 100);
//     }
//   }
//   get query() {
//     const url = new URLSearchParams();
//     url.append('from', location.pathname);
//     switch (this.status) {
//       case 401:
//         url.append('toast', SIGN_IN_QUERY_PARAM_TOAST['session-expired']);
//         break;
//       case 403:
//         url.append('toast', SIGN_IN_QUERY_PARAM_TOAST['invalid-session']);
//         break;
//     }

//     if (url.size === 0) return '';

//     return `?${url.toString()}`;
//   }

//   constructor(msg: string, res: Partial<Response>) {
//     super(msg);
//     this.status = res?.status ?? 0;
//     this.statusText = res.statusText ?? 'unknown error';
//     if (5 === this.type) msg = '서버에 문제가 발생한 것 같아요.🤦‍♂️';
//     this.message = t(msg);

//     if (HttpError.unAuth(this.status)) {
//       storage.set(STORAGE['auth']);
//       location.replace(`${ROUTES_PATH['/sign-in']}${this.query}`);
//     }
//   }
// }
