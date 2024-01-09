// Importing necessary dependencies/modules
import bcrypt from 'bcrypt'; // Importing the bcrypt library for password hashing
import db from '../models/index.js'; // Importing the database models

// Setting up salt rounds for bcrypt hashing
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Function to hash user password using bcrypt
const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt); // Hashing the password using bcrypt and the generated salt
  return hashPassword; // Returning the hashed password
};

// Function to check if a given email already exists in the database
const checkEmailExist = async (userEmail) => {
  const user = await db.User.findOne({
    where: {email: userEmail}, // Querying the database to find a user with the given email
  });
  if (user) {
    return true; // If user exists, return true
  }
  return false; // If user does not exist, return false
};

// Function to register a new user
const registerNewUser = async (rawUserData) => {
  try {
    // Checking if the email already exists in the database
    const isEmailExist = await checkEmailExist(rawUserData.email);

    if (isEmailExist === true) {
      // If the email already exists, return an error message
      return {
        EM: 'The email is already exist',
        EC: 1,
      };
    }

    const pass = rawUserData.password;
    // Hashing the user's password
    const hashPass = hashUserPassword(pass.toString());

    const currentTimestamp = new Date(); // Get the current timestamp

    // Creating a new user in the database
    const newUser = await db.User.create({
      email: rawUserData.email,
      enc_password: hashPass,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    const userId = newUser.id;

    // Creating a user profile associated with the newly created user
    await db.UserProfile.create({
      first_name: rawUserData.firstname,
      last_name: rawUserData.lastname,
      userId: userId,
      roleId: 4,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    // Returning a success message
    return {
      EM: 'A user is created successfully',
      EC: 0,
    };
  } catch (e) {
    // If there's an error during the registration process, log the error and return an error message
    console.log(e);
    return {
      EM: 'Error',
      EC: -2,
    };
  }
};

// Exporting the functions for use in other parts of the application
module.exports = {
  registerNewUser,
  checkEmailExist,
  hashUserPassword,
};
