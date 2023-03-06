import * as http2 from 'node:http2';
import type { IRequestBuilder, HttpMethod } from './types';

type Http2RequestOptions = {
  host?: string;
  path?: string; 
  method?: string;
}

class Http2Request {

  constructor(private options: Http2RequestOptions = {}) {}

  public setOption<K extends keyof Http2RequestOptions>(
    key: K,
    value: Http2RequestOptions[K]
  ): void {
    this.options[key] = value;
  }

  public async execute() {
    return new Promise((resolve, reject) => {
      const client = http2.connect(this.options.host);
      client.on('error', reject);

      const request = client.request({
        ':path': this.options.path,
        ':method': this.options.method
      });
      request.setEncoding('utf8');

      let responseBody = '';
      request.on('data', chunk => responseBody += chunk);
      request.on('end', () => 
        client.close(
          () => resolve(JSON.parse(responseBody))
        )
      );

      request.end();
    });
  }
}

class Http2RequestBuilder implements IRequestBuilder {

  private http2Request = new Http2Request();

  public setUrl(url: string): void {
    const { host, pathname, protocol } = new URL(url);

    this.http2Request.setOption('host', `${protocol}//${host}`);
    this.http2Request.setOption('path', pathname);
  }

  public setMethod(httpMethod: HttpMethod): void {
    this.http2Request.setOption('method', httpMethod);
  }

  public getResult(): Http2Request {
    return this.http2Request;
  }

}

export default Http2RequestBuilder;
