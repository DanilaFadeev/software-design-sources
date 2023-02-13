const http = require('node:http');
const ApiKeyService = require('./ApiKeyService.js');

const apiKeyService = new ApiKeyService();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Endpoint 'POST /api-keys' that generates a new API Key
  if (req.url === '/api-keys' && req.method === 'POST') {
    // parse request body
    const body = await new Promise(resolve => {
      req.once('data', chunk => {
        const chunkString = Buffer.from(chunk).toString();
        resolve(JSON.parse(chunkString));
      });
    });

    const apiKey = apiKeyService.createKey(body.description);

    return res.end(JSON.stringify(apiKey));
  }

  // Endpoint 'GET /api-keys' that returns the list of existing API Keys
  if (req.url === '/api-keys' && req.method === 'GET') {
    const keys = apiKeyService.getKeys();
    return res.end(JSON.stringify(keys));
  }

  // Authenticate request with the API Key
  const apiKey = req.headers['x-api-key'];
  if (!apiKeyService.useKey(apiKey)) {
    return res.writeHead(401).end('API Key is not provided or incorrect');
  }
  
  return res.writeHead(200).end('You are in!');
});

server.listen(3000, '127.0.0.1', () => {
  const { address, port } = server.address();
  console.log(`Server running at http://${address}:${port}`);
});
