// src/server.js
// declare requirements
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const router = require('./routes');

// how to use them
console.log(publicPath);

app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use('/api', router);

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@ds245901.mlab.com:45901/army_men`);
