import HttpRequestBuilder from './HttpRequestBuilder';
import Http2RequestBuilder from './Http2RequestBuilder';
import type { IRequestBuilder } from './types';

class PlaceholderRequestDirector {
  public static buildFindRequest(builder: IRequestBuilder) {
    builder.setUrl('https://jsonplaceholder.typicode.com/todos/1');
    builder.setMethod('GET');
  }
}

(async () => {
  // Here is how the request will look without the Builder
  // const httpRequest = new HttpRequest({ host: 'jsonplaceholder.typicode.com', path: '/todos/2', method: 'GET', port: 80 });

  // Make a request using HTTP/1.1
  const httpRequestBuilder = new HttpRequestBuilder();
  PlaceholderRequestDirector.buildFindRequest(httpRequestBuilder);

  const httpRequest = httpRequestBuilder.getResult();
  const httpResponse = await httpRequest.execute();

  console.log('HttpRequestBuilder response:', httpResponse);

  // Make a request using HTTP/2
  const http2RequestBuilder = new Http2RequestBuilder();
  PlaceholderRequestDirector.buildFindRequest(http2RequestBuilder);

  const http2Request = http2RequestBuilder.getResult();
  const http2Response = await http2Request.execute();

  console.log('Http2RequestBuilder response:', http2Response);
})();