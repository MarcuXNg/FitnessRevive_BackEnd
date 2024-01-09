/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// import userService from '../service/userService.js';
import registerService from '../service/registerService.js';
import loginService from '../service/loginService.js';
import db from '../models/index.js';
require('dotenv').config();

// handle Register
const handleRegister = async (req, res) => {
  try {
    // req.body: email, firstname, lastname, password
    if (
      !req.body.email ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: 'Missing required parameters', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // date
      });
    }

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
    const currentTimestamp = new Date(); // Get the current timestamp
    const cookies = req.cookies;
    // console.log(req.body);
    const username = req.body.ValueLogin;
    const password = req.body.PasswordLogin;
    if (!username || !password) {
      return res.status(400).json({
        EM: 'Username and password are required.', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // data
      });
    }

    const foundUser = await db.User.findOne({
      where: {email: username},
    });

    if (!foundUser) {
      return res.status(401).json({
        EM: 'Unauthorized.', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // data
      });
    } // Unauthorized

    let data = await loginService.handleUserLogin(req.body);

    let result = data.DT;

    // Retrieve the user's existing refresh tokens from the JWTs model
    const existingRefreshTokens = await db.JWTs.findAll({where: {userId: foundUser.id}});

    // Clear out ALL previous refresh tokens if user logs in but never uses RT or RT is stolen
    if (cookies?.jwt || existingRefreshTokens.length > 0) {
      await db.JWTs.destroy({where: {userId: foundUser.id}});
    }
    /*
    Scenario added here:
        1) User logs in but never uses RT and does not logout
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */

    if (foundUser) {
      try {
        await db.JWTs.create({
          userId: foundUser.dataValues.id,
          refreshToken: result.refresh_token,
          createdAt: currentTimestamp,
          updatedAt: currentTimestamp,
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(newRefreshTokenObject);
    }

    // set cookie
    if (data && result && result.refresh_token && result.access_token) {
      // Creates Secure Cookie with refresh token
      res.cookie('jwt', result.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Include 'access_token' in the response headers

      res.setHeader('Authorization', `Bearer ${result.access_token}`);
    }

    // Exclude 'access_token' from DT before sending the response
    const {refresh_token, ...DTWithoutRefreshToken} = result;
    // console.log(DTWithoutRefreshToken);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code (error = -1, success = 0)
      DT: DTWithoutRefreshToken, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // data
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;

    // Check refreshToken in db
    const foundToken = await db.JWTs.findOne({
      where: {refreshToken: refreshToken},
    });

    // Check if refreshToken was not found in the database
    if (!foundToken) {
      res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
      return res.sendStatus(204);
    }

    // Find the user associated with the refresh token
    const user = await db.User.findOne({where: {id: foundToken.dataValues.userId}}); // Assuming you store user ID in req.user
    if (!user) {
      res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
      return res.sendStatus(204);
    }

    // Find and delete the refresh token in the JWTs table
    const deletedToken = await db.JWTs.destroy({where: {refreshToken: refreshToken}});

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    if (deletedToken) {
      return res.status(200).json({
        EM: 'clear cookie done!', // error message
        EC: 0, // error code (error = -1, success = 0)
        DT: '', // data
      });
    } else {
      // Handle the case where the token was not found in the JWTs table
      return res.status(500).json({
        EM: 'Internal Server Error', // error message
        EC: '-1', // error code (error = -1, success = 0)
        DT: '', // data
      });
    }
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
  handleLogout,
};
