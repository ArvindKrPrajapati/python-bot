const https = require('https');
const url = require('url');

function fetch(method, urlStr, headers = {},body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(urlStr);

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      method: method.toUpperCase(),
      headers: {
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // Resolve with the response object
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      // Reject with the error object
      reject(error);
    });

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }

    req.end();
  });
}

module.exports = fetch;
