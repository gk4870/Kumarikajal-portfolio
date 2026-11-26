const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const START_PORT = Number(process.env.PORT) || 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const resolved = path.resolve(ROOT, relativePath);

  if (!resolved.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(resolved, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

function listenWithFallback(port) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < START_PORT + 20) {
      listenWithFallback(port + 1);
      return;
    }
    console.error(err);
    process.exit(1);
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`Portfolio running at http://localhost:${port}`);
  });
}

listenWithFallback(START_PORT);
