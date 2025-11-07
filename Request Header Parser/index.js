// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Request Header Parser Microservice endpoint
app.get('/api/whoami', function (req, res) {
  // Get IP address from request
  let ipaddress = req.ip || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress ||
                 (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  // Clean IP address (remove IPv6 prefix if present)
  if (ipaddress) {
    ipaddress = ipaddress.replace(/^::ffff:/, '');
    // If it's IPv6 localhost, convert to IPv4 for consistency
    if (ipaddress === '::1') {
      ipaddress = '127.0.0.1';
    }
  }
  
  // Get preferred language from Accept-Language header
  const language = req.headers['accept-language'];
  const parsedLanguage = language ? language.split(',')[0] : 'Unknown';
  
  // Get software info from User-Agent header
  const software = req.headers['user-agent'];
  let parsedSoftware = 'Unknown';
  
  if (software) {
    // Extract the part between parentheses in User-Agent
    // Example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
    const match = software.match(/\(([^)]+)\)/);
    parsedSoftware = match ? match[1] : software;
  }

  // Return JSON response with the required fields
  res.json({
    ipaddress: ipaddress,
    language: parsedLanguage,
    software: parsedSoftware
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/headers', function (req, res) {
  const headers = {
    ...req.headers,
    clientIp: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString()
  };
  res.json(headers);
});

