// src/server.js
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const config = require('./config');
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const router = require('./routes');

console.log(publicPath);

app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use('/api', router);

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
