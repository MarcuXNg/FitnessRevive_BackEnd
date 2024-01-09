/* eslint-disable prefer-const */
require('dotenv').config();
import bcrypt from 'bcrypt';
import db from '../models/index.js';
import {getRolesWithUrl} from '../service/JWTservice.js';
import {createJWT, createRefreshJWT} from '../middleware/JWTAction.js';

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    const usernameLogin = rawData.ValueLogin;
    const passwordLogin = rawData.PasswordLogin;
    if (!usernameLogin || !passwordLogin) {
      return {
        EM: 'Username and password are required.',
        EC: 1,
        DT: '',
      };
    }
    // check email
    const user = await db.User.findOne({
      where: {email: usernameLogin},
      include: [{model: db.UserProfile}],
    });
    // console.log(user);
    // check password
    if (user) {
      let isCorrectPassword = checkPassword(passwordLogin, user.enc_password); // check password and return true or false
      if (isCorrectPassword === true) {
        // JWT
        let rolesWithPermission = await getRolesWithUrl(user);
        let payload = {
          rolesWithPermission,
          email: user.email,
          username: user.dataValues.UserProfile.dataValues.last_name + ' ' + user.dataValues.UserProfile.dataValues.first_name,
        };
        let token = createJWT(payload);
        let refreshToken = createRefreshJWT(payload);

        // console.log(token);
        return {
          EM: 'ok!',
          EC: 0,
          DT: {
            access_token: token,
            refresh_token: refreshToken,
            rolesWithPermission,
            email: user.email,
            username: user.dataValues.UserProfile.dataValues.last_name + ' ' + user.dataValues.UserProfile.dataValues.first_name,
          },
        };
      }
    }

    return {
      EM: 'Your email or password is incorrect',
      EC: 1,
      DT: '',
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error',
      EC: -2,
    };
  }
};

module.exports = {
  handleUserLogin,
  checkPassword,
};
