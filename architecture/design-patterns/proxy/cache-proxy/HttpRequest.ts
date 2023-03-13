import * as https from 'node:https';
import type { IncomingMessage } from 'node:http';
import type { IHttpRequest, HttpResponse } from './types';

class HttpRequest implements IHttpRequest {

  async get(url: string): Promise<HttpResponse> {
    const response = await new Promise<IncomingMessage>(resolve => {
      https.request(url, resolve).end();
    });

    const responseBody = await new Promise<string>(resolve => {
      let body = '';
      response.on('data', chunk => body += chunk);
      response.on('end', () => resolve(body.toString()));
    });

    return {
      status: `${response.statusCode} ${response.statusMessage}`,
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      headers: response.headers,
      body: JSON.parse(responseBody)
    };
  }

}

export default HttpRequest;
