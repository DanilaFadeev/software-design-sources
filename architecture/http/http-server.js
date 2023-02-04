const http = require('node:http');

const server = http.createServer(async (req, res) => {
  // read request body as a stream
  const bodyContent = await new Promise(resolve => {
    let content = '';
    req.on('data', chunk => content += chunk);
    req.on('end', () => resolve(content));
  });

  const requestDetails = {
    url: req.url, // requested URL path
    method: req.method, // HTTP request method
    http: {
      version: req.httpVersion, // HTTP version sent by the client
      versionMajor: req.httpVersionMajor, // HTTP version major digit
      versionMinor: req.httpVersionMinor // HTTP version minor digit
    },
    status: {
      message: req.statusMessage, // 3-digit HTTP response status code. E.G. 404.
      code: req.statusCode, // HTTP response status message (reason phrase). E.G. OK or Internal Server Error.
      complete: req.complete // will be true if a complete HTTP message has been received and successfully parsed
    },
    body: {
      readable: req.readable,
      content: bodyContent // request body received from a stream
    },
    headers: {
      parsed: req.headers, // parsed request headers object
      raw: req.rawHeaders // raw request headers list exactly as they were received
    }
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(requestDetails));
});

server.listen(3000);

/* Example response to a request from Postman
{
  "url": "/verify",
  "method": "POST",
  "http": {
    "version": "1.1",
    "versionMajor": 1,
    "versionMinor": 1
  },
  "status": {
    "message": null,
    "code": null,
    "complete": true
  },
  "body": {
    "readable": false,
    "content": "Sample text"
  },
  "headers": {
    "parsed": {
      "content-type": "text/plain",
      "user-agent": "PostmanRuntime/7.29.2",
      "host": "localhost:3000",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
    },
    "raw": [
      "Content-Type", "text/plain",
      "User-Agent", "PostmanRuntime/7.29.2",
      "Host", "localhost:3000",
      "Accept-Encoding", "gzip, deflate, br",
      "Connection", "keep-alive"
    ]
  }
}
*/
