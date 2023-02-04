const http = require('node:http');

const server = http.createServer((request, response) => {
  console.debug(`${Date.now()}: ${request.method} ${request.url}`);

  switch (request.url) {
    case '/permanent/moved-permanently':
      // 301 Moved Permanently - Redirects to '/' using GET method
      response.writeHead(301, { 'Location': '/' });
      break;
    case '/permanent/permanent-redirect':
      // 308 Permanent Redirect - Redirects to '/' using the origin method
      response.writeHead(308, { 'Location': '/' });
      break;
    case '/temporary/found':
      // 302 Found - Redirects to '/' using GET method
      response.writeHead(302, { 'Location': '/' });
      break;
    case '/temporary/see-other':
      // 303 See Other - Redirects to '/' using GET method
      response.writeHead(303, { 'Location': '/' });
      break;
    case '/temporary/temporary-redirect':
      // 307 Temporary Redirect - Redirects to '/' using the origin method
      response.writeHead(307, { 'Location': '/' });
      break;
    case '/special/multiple-choice':
      // 300 Multiple Choice
      response.writeHead(300, {
        'Location': '/', // will not trigger the redirect
        'Link': '</>; rel="alternate", </permanent>; rel="alternate"' // specify machine-readable choices
      });
      break;
    case '/special/not-modified':
      // 304 Not Modified
      response.statusCode = 304;    
      break;
    case '/redirection-loop':
      // On Chrome: ERR_TOO_MANY_REDIRECTS - localhost redirected you too many times.
      response.writeHead(301, { 'Location': '/redirection-loop' });
      break;
    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write('Node.js redirects example');
  }
  response.end();
});

server.listen(3000);
