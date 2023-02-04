const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const MimeType = Object.freeze({
  JSON: 'application/json',
  HTML: 'text/html',
  TEXT: 'text/plain',
  PNG: 'image/png'
});

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    return res.writeHead(405).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const isDownload = url.searchParams.has('download'); // query param to force file download

  switch (url.pathname) {
    case '/json': {
      res
        .setHeader('Content-Disposition', isDownload ? 'attachment; filename="response.json"' : 'inline')
        .writeHead(200, { 'Content-Type': MimeType.JSON })
        .end('{ "mimeType": "application/json" }');
      break;
    }
    case '/html': {
      res
        .setHeader('Content-Disposition', isDownload ? 'attachment; filename="response.html"' : 'inline')
        .writeHead(200, { 'Content-Type': MimeType.HTML })
        .end('<h1>HTML Content with <b>text/html</b> type</>');
      break;
    }
    case '/text': {
      res
       .setHeader('Content-Disposition', isDownload ? 'attachment; filename="response.txt"' : 'inline')
        .writeHead(200, { 'Content-Type': MimeType.TEXT })
        .end('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
      break;
    }
    case '/png': {
      const filePath = path.join(__dirname, 'data', 'penguin.png');
      fs.createReadStream(filePath).pipe(res);

      res.setHeader('Content-Disposition', isDownload ? 'attachment; filename="response.png"' : 'inline')
      res.writeHead(200, { 'Content-Type': MimeType.PNG });
      break;
    }
    default: {
      res.writeHead(404).end();
    }
  }
});

server.listen(3000);
