// const sql = require('../models/db.js');
// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

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
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: process.env.HOST || dbConfig.HOST || 'localhost',
    user: process.env.USER || dbConfig.USER || 'root',
    password: process.env.PASSWORD || dbConfig.PASSWORD || 'root',
    database: process.env.DB || dbConfig.DB || 'fitness',
    Promise: bluebird,
  });
  const query = `SELECT * FROM user_account WHERE id =?`;
  try {
    const [rows, fields] = await connection.execute(query, [id]);
    // console.log(rows);
    return rows[0];
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

    return {userList};
  } catch (error) {
    console.log(error);
  }
};

const updateUserByID = async (id, tutorial, result) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: process.env.HOST || dbConfig.HOST || 'localhost',
    user: process.env.USER || dbConfig.USER || 'root',
    password: process.env.PASSWORD || dbConfig.PASSWORD || 'root',
    database: process.env.DB || dbConfig.DB || 'fitness',
    Promise: bluebird,
  });
  const query = 'SELECT * FROM user_account WHERE id=?';
  try {
    const [rows, fields] = await connection.execute(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
  // sql.query(
  //     'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
  //     [tutorial.title, tutorial.description, tutorial.published, id],
  //     (err, res) => {
  //       if (err) {
  //         console.log('error: ', err);
  //         result(null, err);
  //         return;
  //       }

  //       if (res.affectedRows == 0) {
  //       // not found Tutorial with the id
  //         result({kind: 'not_found'}, null);
  //         return;
  //       }

  //       console.log('updated tutorial: ', {id: id, ...tutorial});
  //       result(null, {id: id, ...tutorial});
  //     },
  // );
};

const deleteUser = async (id) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: process.env.HOST || dbConfig.HOST || 'localhost',
    user: process.env.USER || dbConfig.USER || 'root',
    password: process.env.PASSWORD || dbConfig.PASSWORD || 'root',
    database: process.env.DB || dbConfig.DB || 'fitness',
    Promise: bluebird,
  });
  const query1 = 'DELETE FROM user_account WHERE id=?';
  const query2 = 'DELETE FROM user_profile WHERE userId=?';
  try {
    const [rows1] = await connection.execute(query1, [id]);
    const [rows2] = await connection.execute(query2, [id]);
    return {rows1, rows2};
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
