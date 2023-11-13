const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');

import initWebRoutes from './src/routes/routes.js';
import connection from './src/config/connectDB.js';

// import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();

const corsOptions = {
  origin: process.env.Frontend || 'http://localhost:3000', // connect to frontend localhost:3000
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); /* bodyParser.urlencoded() is deprecated */

// test connection db
connection();

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to our Database.'});
});

initWebRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Database is running on port ${PORT}.`);
});
