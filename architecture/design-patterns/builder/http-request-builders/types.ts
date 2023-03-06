export type HttpMethod = 'CONNECT' | 'GET' | 'POST' | 'PATCH' | 'UPDATE' | 'DELETE' | 'HEAD' | 'TRACE';

export interface IRequestBuilder {
  setUrl(url: string): void;
  setMethod(httpMethod: HttpMethod): void;
}
