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
  const hashPass = hashUserPassword(password.toString());
  // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({
  //   host: process.env.HOST || dbConfig.HOST || 'localhost',
  //   user: process.env.USER || dbConfig.USER || 'root',
  //   password: process.env.PASSWORD || dbConfig.PASSWORD || 'root',
  //   database: process.env.DB || dbConfig.DB || 'fitness',
  //   Promise: bluebird,
  // });

  const currentTimestamp = new Date(); // Get the current timestamp

  // const query1 = 'INSERT INTO user_account (email, enc_password, createdAt) VALUES (?, ?, ?)';
  // const query2 = 'INSERT INTO user_profile (first_name, last_name, userId, updatedAt) VALUES (?, ?, ?, ?)';
  try {
    console.log(Object.keys(db));
    await db.User.create({
      email: email,
      enc_password: hashPass,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    // const [userAccountResult] = await connection.execute(query1, [email, hashPass, currentTimestamp]);
    // const userId = userAccountResult.insertId;
    // await connection.execute(query2, [firstname, lastname, userId, currentTimestamp]);
    // console.log(rows);
    // return rows;

    // await db.User.create({
    //   first_name: firstname,
    //   last_name: lastname,
    //   userId: userId,
    //   updatedAt: currentTimestamp,
    // });
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
  const connection = await mysql.createConnection({
    host: process.env.HOST || dbConfig.HOST || 'localhost',
    user: process.env.USER || dbConfig.USER || 'root',
    password: process.env.PASSWORD || dbConfig.PASSWORD || 'root',
    database: process.env.DB || dbConfig.DB || 'fitness',
    Promise: bluebird,
  });
  const query1 = 'SELECT * FROM user_account';
  const query2 = 'SELECT * FROM user_profile';
  try {
    const [rows1] = await connection.execute(query1);
    const [rows2] = await connection.execute(query2);

    // Combine the data based on the common 'id'
    const mergedData = rows1.map((userAccount) => {
      const userProfile = rows2.find((profile) => profile.id === userAccount.id);
      return {
        ...userAccount,
        ...(userProfile && {userprofile: userProfile}),
      };
    });
    // console.log(mergeData);
    return mergedData;
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
