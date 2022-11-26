const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
const express = require('express');
const request = require('request');
const serverless = require('serverless-http');
const app = express();
app.use('/', (req, res) => {
    const url = 'http://localhost:4000' + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(3000);

module.exports = app;
module.exports.handler = serverless(app);