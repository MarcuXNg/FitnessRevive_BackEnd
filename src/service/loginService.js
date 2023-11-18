import bcrypt from 'bcrypt';
import db from '../models/index.js';

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    // check email
    const user = await db.User.findOne({
      where: {email: rawData.ValueLogin},
    });
    // check password
    if (user) {
      const isCorrectPassword = checkPassword(rawData.PasswordLogin, user.enc_password);
      if (isCorrectPassword === true) {
        return {
          EM: 'ok!',
          EC: 0,
          DT: '',
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
