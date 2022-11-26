const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 4000;

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

//make express listen to 4000 on 3000 and every path will be called to 4000
//for example, if i call localhost:3000/api/whatever, it will be called to localhost:4000/api/whatever
const express = require('express');
const request = require('request');
const app = express();
app.use('/', (req, res) => {
    const url = 'http://localhost:4000' + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(3000);
