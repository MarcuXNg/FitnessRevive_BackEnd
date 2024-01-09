/* eslint-disable prefer-const */
import express from 'express';
// const bodyParser = require("body-parser"); /* deprecated */

import {initWebRoutes} from './src/routes/routes.js'; // import routes
import configcors from './src/middleware/cors.js'; // import cors
import cookieParser from 'cookie-parser'; // import cookie-parser
import errorHandler from './src/handler/errorHandler'; // import error handler

// import env file config
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

// error handler
app.use(errorHandler);

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to our Database.'});
});

// routes
initWebRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
