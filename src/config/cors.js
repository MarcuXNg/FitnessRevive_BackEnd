require('dotenv').config();

const configcors = (app) => {
  app.use(function(req, res, next) {
    // website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.Frontend);
    // request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // set to true if you need the website to include cookies in the requests
    // to the API
    res.setHeader('Access-Control-Allow-Credentials', true);

    // pass to next layer of middleware
    next();
  });
};

export default configcors;
