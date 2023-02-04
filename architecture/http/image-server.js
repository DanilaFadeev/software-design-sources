const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const filepath = path.join(__dirname, 'image.png');

const server = http.createServer((req, res) => {
  // Upload png file - POST /upload
  if (req.method === 'POST' && req.url === '/upload') {
    if (req.readable) {
      const fileStream = fs.createWriteStream(filepath);
      req.pipe(fileStream);

      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ uploaded: true }));
      });
    }
  }
  // Preview uploaded file - GET /view
  else if (req.method === 'GET' && req.url === '/view') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
  
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end();
  }
});

server.listen(3000);
