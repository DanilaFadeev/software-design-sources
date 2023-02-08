const http = require('node:http');
const { BasicAuth } = require('./basic-auth');

// construct basic auth validator with hardcoded credentials
const basicAuth = BasicAuth({
  username: 'admin',
  password: 'admin'
});

const server = http.createServer((req, res) => {
  const authentication = basicAuth(req);
  if (!authentication) {
    return res
      .writeHead(401, { 'WWW-Authenticate': 'Basic' })
      .end('Unauthenticated');
  }

  res.writeHead(200);
  res.end(`Welcome, ${authentication.username}!`);
});

server.listen(3000);
