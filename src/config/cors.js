require('dotenv').config();
import cors from 'cors';

const configcors = (app) => {
  // app.use(function(req, res, next) {
  //   // website you wish to allow to connect
  //   res.setHeader('Access-Control-Allow-Origin', process.env.Frontend);
  //   // request methods you wish to allow
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //   // request headers you wish to allow
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  //   // set to true if you need the website to include cookies in the requests
  //   // to the API
  //   res.setHeader('Access-Control-Allow-Credentials', true);

  //   if (req.method === 'OPTIONS') {
  //     return res.sendStatus(200);
  //   }

  //   // pass to next layer of middleware
  //   next();
  // });
  const corsOptions = {
    origin: process.env.Frontend, // Allow requests from this origin
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'], // Allow these headers
    credentials: true, // Allow sending cookies
  };

  app.use(cors(corsOptions));
};

export default configcors;
