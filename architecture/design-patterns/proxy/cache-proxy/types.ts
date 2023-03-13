export type HttpResponse = {
  status: string;
  statusCode: number;
  statusMessage: string;
  headers: Record<string, string | string[]>;
  body?: Object;
};

export interface IHttpRequest {
  get(url: string): Promise<HttpResponse>;
}
