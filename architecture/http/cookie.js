const http = require('node:http');

const parseCookies = cookieHeader => {
  if (typeof cookieHeader !== 'string' || !cookieHeader) {
    return {};
  }
  return cookieHeader
    .split(';')
    .map(cookie => {
      const [key, value] = cookie.split('=');
      return { key, value };
    });
};

const server = http.createServer((req, res) => {
  // response body
  const result = {
    rawCookies: req.headers.cookie, // cookie key-value pairs without attributes
    cookies: parseCookies(req.headers.cookie)
  };

  if (req.url === '/set-cookies') {
    res.setHeader('Set-Cookie', [
      'theme=dark',
      'ttlOneMinute=exists; Max-Age=60', // TTL 60 seconds
      `ttlTwoMinutes=exists; Expires=${new Date(Date.now() + 1000 * 60 * 2).toGMTString()}`, // TTL 2 minutes
      `httpsOnlyValue=true; Secure`, // ignored on 'localhost'
      `nonJsAccessible=true; HttpOnly`, // will not be shown on 'document.cookie'
      `externalDomain=true; Domain=netlify.app`, // ignored on 'localhost'
      `routeDependent=true; Path=/set-cookies` // available only at /set-cookies path
    ]);
  }

  // send the response as a formatted JSON
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result, null, 2));
});

server.listen(3000);
