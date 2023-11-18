// const sql = require('../models/db.js');
// get the client
// const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
// const bluebird = require('bluebird');

import bcrypt from 'bcrypt';
import db from '../models/index.js';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};


const createNewUser = async (email, password, firstname, lastname) => {
  // console.log('Received values:', email, password, firstname, lastname);
  const hashPass = hashUserPassword(password.toString());

  const currentTimestamp = new Date(); // Get the current timestamp

  try {
    const newUser = await db.User.create({
      email: email,
      enc_password: hashPass,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    },
    );

    const userId = newUser.id;

    await db.UserProfile.create({
      first_name: firstname,
      last_name: lastname,
      userId: userId,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
  } catch (error) {
    console.log(error);
  }
};


const userById = async (id) => {
  try {
    let user = {};

    user = await db.User.findOne({
      where: {id: id},
      include: db.UserProfile,
    });
    if (user === null) {
      console.log('Not found!');
    };
    // console.log(user, id);
    const userdata = user.get({plain: true}); // user as object
    return userdata;
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async () => {
  // create the connection, specify bluebird as Promise

  try {
    // const userAccounts = await db.User.findAll();
    // const userProfiles = await db.UserProfile.findAll();
    const userAccounts = await db.User.findAll({
      include: db.UserProfile, // Include user profiles in the query
    });

    // Combine the data based on the common 'id'
    const userList = userAccounts.map((userAccount) => {
      const {id, email, password, createdAt, updatedAt, UserProfile} = userAccount;

      return {
        id,
        email,
        password,
        createdAt,
        updatedAt,
        first_name: UserProfile?.first_name || null,
        last_name: UserProfile?.last_name || null,
      };
    });
    // const mergedData = userAccounts.map((userAccount) => {
    //   const userProfile = userProfiles.find((profile) => profile.userId === userAccount.id);

    //   return {
    //     ...userAccount.get({plain: true}),
    //     ...(userProfile && {userprofile: userProfile.get({plain: true})}),
    //   };
    // });
    // // console.log(mergeData);
    // return mergedData;

    return userList;
  } catch (error) {
    console.log(error);
  }
};

const updateUserByID = async (id, email, firstname, lastname) => {
  // Find the user by id and include the associated profile
  const user = await db.User.findByPk(userId, {
    include: db.UserProfile,
  });
  await user.update(
      {email: email,
        first_name: firstname,
        last_name: lastname},
      {
        where: {
          id: id,
        },
      },
  );
};

const deleteUser = async (userId) => {
  try {
    // Find the user by id and include the associated profile
    const user = await db.User.findByPk(userId, {
      include: db.UserProfile,
    });

    if (user) {
      // Destroy the user and its associated profile
      await user.destroy();
    };
  } catch (error) {
    console.log(error);
  }
};

// Tutorial.removeAll = (result) => {
//   sql.query('DELETE FROM tutorials', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };


module.exports = {
  createNewUser,
  getAllUser,
  deleteUser,
  userById,
  updateUserByID,
};
