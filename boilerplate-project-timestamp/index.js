// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp Microservice API endpoint
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // Handle empty date parameter (current time) - Test 7 & 8
  if (!dateString) {
    date = new Date();
  } else {
    // Check if it's a Unix timestamp (numbers only) - Test 4
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString); // Test 2, 3, 5
    }
  }

  // Check if date is valid - Test 6
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return successful response - Test 2, 3, 4
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});