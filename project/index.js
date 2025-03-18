const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Serve the homepage
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error loading the home page');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    // Serve static files from the 'images' directory or other static content
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Resource not found');
      } else {
        res.statusCode = 200;
        // Set the content type based on the file extension
        const ext = path.extname(req.url).toLowerCase();
        switch (ext) {
          case '.png':
            res.setHeader('Content-Type', 'image/png');
            break;
          case '.jpg':
          case '.jpeg':
            res.setHeader('Content-Type', 'image/jpeg');
            break;
          case '.css':
            res.setHeader('Content-Type', 'text/css');
            break;
          case '.js':
            res.setHeader('Content-Type', 'text/javascript');
            break;
          default:
            res.setHeader('Content-Type', 'text/plain');
        }
        res.end(data);
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
