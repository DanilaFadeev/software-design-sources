const http = require('node:http');
const { BasicAuth } = require('./basic-auth');

const userBasicAuth = BasicAuth({ username: 'users', password: 'password' });
const taskBasicAuth = BasicAuth({ username: 'tasks', password: 'password' });

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/user')) {
    if (!userBasicAuth(req)) {
      // ask for Basic Auth credentials for the 'users' section
      return res
        .writeHead(401, { 'WWW-Authenticate': "Basic realm='users'" })
        .end('Users Section - Unauthenticated');
    }
    return res
      .writeHead(200)
      .end('Welcome to the Users Section!');
  }

  if (req.url.startsWith('/tasks')) {
    // ask for Basic Auth credentials for the 'tasks' section
    if (!taskBasicAuth(req)) {
      return res
        .writeHead(401, { 'WWW-Authenticate': "Basic realm='tasks" })
        .end('Tasks Section - Unauthenticated');
    }
    return res
      .writeHead(200)
      .end('Welcome to the Tasks Section!');
  }

  res
    .writeHead(404)
    .end('See /users/* or /tasks/* routes');
});

server.listen(3000);
