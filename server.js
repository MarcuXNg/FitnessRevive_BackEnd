/* eslint-disable prefer-const */
import express from 'express';
// const bodyParser = require("body-parser"); /* deprecated */

import {initWebRoutes} from './src/routes/routes.js';
import configcors from './src/config/cors.js';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

// config cors
configcors(app);

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); /* bodyParser.urlencoded() is deprecated */

// config cookie-parser
app.use(cookieParser());

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to our Database.'});
});

initWebRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
