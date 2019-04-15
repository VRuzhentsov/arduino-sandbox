const fs = require('fs');

const path = require('path');

exports.router = function (request, response) {
  console.log('request starting...');
  const clientFolder = '/client-app';

  let filePath = `.${clientFolder}${request.url}`;
  if (filePath === `.${clientFolder}/`) {
    filePath = `.${clientFolder}/index.html`;
  }

  const extname = path.extname(filePath);
  let contentType = '';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./client-app/404.html', (fsError, fsContent) => {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(fsContent, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        response.end();
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
};
