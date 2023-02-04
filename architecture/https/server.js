const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

// Private key and certificate are generated with the openssl command:
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365

const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')), // private server key
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')), // public certificate
  passphrase: 'software-design'
};

// create HTTPs server with generated SSL certificate
const server = https.createServer(options, (_req, res) => {
  res.writeHead(200);
  res.end('Running with a self signed SSL/TLS certificate!\n');
});

// Can be checked with the following command:
// curl -k https://localhost:3000
server.listen(3000);
