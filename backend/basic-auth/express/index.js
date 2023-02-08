const express = require('express');

// hardcoded user credentials to be used
const USERNAME = 'admin';
const PASSWORD = 'admin';

const basicAuthMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  // check if the authorization header is preset and uses a Basic schema
  if (!authorization || !authorization.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send('Authentication required');
  }

  // get base64 encoded credentials from the header and decode them
  const [, credentials] = authorization.trim().split(' ');
  const decodedCredentials = Buffer.from(credentials, 'base64').toString(); // decode base64 string

  // extract username and password from decoded credentials
  const [username, password] = decodedCredentials.split(':');

  console.debug('Authentication details:', {
    rawHeader: { authorization },             // { authorization: 'Basic YWRtaW46YWRtaW4=' },
    credentials,                              // 'YWRtaW46YWRtaW4='
    decodedCredentials,                       // admin:admin
    parsedCredentials: { username, password } // { username: 'admin', password: 'admin' }
  });

  // validate received credentials
  if (username !== USERNAME || password !== PASSWORD) {
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send('Invalid credentials');
  }

  next();
};

const server = express();

// Middleware that will process a Basic Authentication
// for all the incoming requests
server.use(basicAuthMiddleware);

server.get('/', (_req, res) => res.send('Authenticated, welcome!'));

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
