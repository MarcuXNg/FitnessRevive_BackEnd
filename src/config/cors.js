require('dotenv').config(); // env
import cors from 'cors'; // import cors

const configcors = (app) => {
  const corsOptions = {
    origin: process.env.Frontend || 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'], // Allow these headers
    credentials: true, // Allow sending cookies
  };

  app.use(cors(corsOptions));
};

export default configcors;
