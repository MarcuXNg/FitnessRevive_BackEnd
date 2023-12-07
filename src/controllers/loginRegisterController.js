/* eslint-disable prefer-const */
// import userService from '../service/userService.js';
import registerService from '../service/registerService.js';
import loginService from '../service/loginService.js';
require('dotenv').config();

// handle Register
const handleRegister = async (req, res) => {
  try {
    // req.body: email, firstname, lastname, password
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
      return res.status(200).json({
        EM: 'Missing required parameters', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // date
      });
    };

    // check password length
    if (req.body.password && req.body.password.length < 8) {
      return res.status(200).json({
        EM: 'Your password must have more than 8 letters', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // date
      });
    }

    const data = await registerService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: '', // date
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

// handle Login
const handleLogin = async (req, res) => {
  try {
    let data = await loginService.handleUserLogin(req.body);
    // set cookie
    if (data && data.DT && data.DT.access_token) {
      res.cookie('jwt', data.DT.access_token, {httpOnly: true, maxAge: 60 * 60 * 1000});
    }

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code (error = -1, success = 0)
      DT: data.DT, // date
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};


module.exports = {
  handleRegister,
  handleLogin,
};
