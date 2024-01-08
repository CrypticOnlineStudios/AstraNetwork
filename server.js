const uv = require('ultraviolet');
const express = uv.express;
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.use(express.static(__dirname));

// Handle form submission and proxy the request
app.post('/proxy', (req, res) => {
  const targetUrl = req.body.url;

  // Make a request to the target server and proxy the response
  request(targetUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send('Error: ' + error);
    }
  });
});

app.listen(80, () => {
  console.log('Server listening on port 80');
});
