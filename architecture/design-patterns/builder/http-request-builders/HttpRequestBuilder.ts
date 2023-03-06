import * as http from 'node:http';
import type { IRequestBuilder, HttpMethod } from './types';

class HttpRequest {

  constructor(private options: http.RequestOptions = {}) {}

  public setOption<K extends keyof http.RequestOptions>(
    key: K,
    value: http.RequestOptions[K]
  ): void {
    this.options[key] = value;
  }

  public async execute(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const request = http.request(this.options, res => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { result += chunk; });
        res.on('end', () => resolve(JSON.parse(result)));
      });

      request.on('error', reject);
      request.end();
    });
  }

}

class HttpRequestBuilder implements IRequestBuilder {

  private httpRequest = new HttpRequest();

  public setUrl(url: string): void {
    const { host, pathname } = new URL(url);

    this.httpRequest.setOption('host', host);
    this.httpRequest.setOption('path', pathname);
  }

  public setMethod(httpMethod: HttpMethod): void {
    this.httpRequest.setOption('method', httpMethod);
  }

  public getResult(): HttpRequest {
    return this.httpRequest;
  }

}

export default HttpRequestBuilder;
