import bcrypt from 'bcrypt';
import db from '../models/index.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// hashpassword
const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

// check Email exist
const checkEmailExist = async (userEmail) => {
  const user = await db.User.findOne({
    where: {email: userEmail},
  });
  if (user) {
    return true;
  };
  return false;
};

// RegisterNewUser
const registerNewUser = async (rawUserData) => {
  try {
    // check Email are exist
    const isEmailExist = await checkEmailExist(rawUserData.email);
    // console.log(isEmailExist);

    if (isEmailExist === true) {
      return {
        EM: 'The email is already exist',
        EC: 1,
      };
    }
    const pass = rawUserData.password;
    // checking user's password
    const hashPass = hashUserPassword(pass.toString());

    const currentTimestamp = new Date(); // Get the current timestamp
    // create new User
    const newUser = await db.User.create({
      email: rawUserData.email,
      enc_password: hashPass,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    },
    );

    const userId = newUser.id;

    await db.UserProfile.create({
      first_name: rawUserData.firstname,
      last_name: rawUserData.lastname,
      userId: userId,
      groupId: 4,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
    return {
      EM: 'A user is created successully',
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: 'Error',
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
};
// export default handleRegister;

