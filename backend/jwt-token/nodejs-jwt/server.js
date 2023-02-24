const http = require('node:http');
const jwt = require('./jwt');

const secret = process.env.JWT_SECRET || 'your-256-bit-secret';

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.url === '/token') {
    const token = jwt.sign({ userId: 123 }, secret);
    return response
      .writeHead(200)
      .end(JSON.stringify({ token }));
  }

  if (request.url === '/verify') {
    const authorization = request.headers['authorization'];
    if (!authorization.startsWith('Bearer ')) {
      return response.writeHead(401).end();
    }

    const [, token] = authorization.split(' ');
    const payload = jwt.verify(token, secret);

    if (!payload) {
      return response.writeHead(401).end();
    }

    return response
      .writeHead(200)
      .end(JSON.stringify({ payload }));
  }

  response.writeHead(404).end();
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
