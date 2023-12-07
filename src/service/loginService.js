/* eslint-disable prefer-const */
require('dotenv').config();
import bcrypt from 'bcrypt';
import db from '../models/index.js';
import {getGroupWithRoles} from '../service/JWTservice.js';
import {createJWT} from '../middleware/JWTAction.js';

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    // check email
    const user = await db.User.findOne({
      where: {email: rawData.ValueLogin},
      include: [{model: db.UserProfile}],
    });
    // console.log(user);
    // check password
    if (user) {
      let isCorrectPassword = checkPassword(rawData.PasswordLogin, user.enc_password);
      if (isCorrectPassword === true) {
        // JWT
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          email: user.email,
          username: user.dataValues.UserProfile.dataValues.last_name + ' ' + user.dataValues.UserProfile.dataValues.first_name,
        };
        let token = createJWT(payload);
        return {
          EM: 'ok!',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
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
};
