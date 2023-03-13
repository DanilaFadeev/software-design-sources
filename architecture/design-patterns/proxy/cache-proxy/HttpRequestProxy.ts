import type { HttpResponse, IHttpRequest } from './types';

class HttpRequestProxy implements IHttpRequest {

  private cache = new Map<string, HttpResponse>();

  constructor(private httpRequest: IHttpRequest) {}

  async get(url: string): Promise<HttpResponse> {
    if (!this.cache.has(url)) {
      const response = await this.httpRequest.get(url);
      this.cache.set(url, response);
    }

    return this.cache.get(url);
  }

}

export default HttpRequestProxy;
