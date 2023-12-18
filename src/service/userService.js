/* eslint-disable prefer-const */
import db from '../models/index.js';
import {checkEmailExist, hashUserPassword} from './registerService.js';

const createNewUser = async (data) => {
  const currentTimestamp = new Date(); // Get the current timestamp

  try {
    // check Email are exist
    const isEmailExist = await checkEmailExist(data.email);
    // console.log(isEmailExist);

    if (isEmailExist === true) {
      return {
        EM: 'The email is already exist',
        EC: 1,
        Dt: `email`,
      };
    }
    const pass = data.password;
    // checking user's password
    const hashPass = hashUserPassword(pass.toString());

    const newUser = await db.User.create({
      email: data.email,
      enc_password: hashPass,
    });
    const userId = newUser.id;
    await db.UserProfile.create({
      first_name: data.firstname,
      last_name: data.lastname,
      groupId: data.group,
      userId: userId,
      city: data.city,
      state: data.state,
      gender: data.gender,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
    // console.log('check', data);
    return {
      EM: 'create Ok',
      EC: 0,
      DT: [],
    };
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
    }
    // console.log(user, id);
    // const userdata = user.get({plain: true}); // user as object
    return user;
  } catch (error) {
    console.log(error);
  }
};

// getUserWithPagination
const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page -1) * limit;
    const {count, rows} = await db.UserProfile.findAndCountAll({
      offset: offset,
      limit: limit,
      // sort: '',
      attributes: ['first_name', 'last_name', 'contact_number', 'state', 'city', 'gender', 'country', 'date_of_birth'],
      include: [
        {model: db.User, attributes: ['id', 'email', 'createdAt', 'updatedAt']},
        {model: db.Group, attributes: ['id', 'name', 'description']},
      ], // Include user profiles in the query
      order: [['id', 'DESC']],
      // raw: true,
    });

    let rowsObject = rows.map((row) => {
      const userProperties = {
        email: row.User.email,
        id: row.User.id,
        groupId: row.Group.id,
        groupName: row.Group.name,
        groupDescription: row.Group.description,
        // Add other user attributes if needed
      };
      // Flatten the User object
      return {
        ...userProperties,
        city: row.city,
        first_name: row.first_name,
        gender: row.gender,
        last_name: row.last_name,
        contact_number: row.contact_number,
        state: row.state,
        country: row.country,
        date_of_birth: row.date_of_birth,
      };
    });

    let totalPages = Math.ceil(count/limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rowsObject,
    };

    return {
      EM: 'Fetch Ok',
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
  }
};

// getAllUser
const getAllUser = async () => {
  try {
    const userAccounts = await db.UserProfile.findAll({
      attributes: ['first_name', 'last_name'],
      include: [
        {
          model: db.User,
          attributes: ['id', 'email', 'createdAt', 'updatedAt'],
        },
        {model: db.Group, attributes: ['id', 'name', 'description']},
      ], // Include user profiles in the query
      // raw: true,
    });
    if (userAccounts) {
      return {
        EM: 'get data success',
        EC: 0,
        DT: userAccounts,
      };
    } else {
      return {
        EM: 'get data success',
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
  }
};

const updateUserByID = async (id, email, firstname, lastname) => {
  try {
    // Find the user by id and include the associated profile
    const user = await db.User.findByPk(userId, {
      include: db.UserProfile,
    });

    if (user) {
      await user.update(
          {email: email, first_name: firstname, last_name: lastname},
          {
            where: {
              id: id,
            },
          },
      );
    } else {
    }
  } catch (error) {}
};

// deleteUser
const deleteUser = async (id) => {
  try {
    // console.log(id);
    let user = await db.User.findOne({
      where: {id: id},
      include: db.UserProfile,
    });

    if (user) {
      // Destroy the user and its associated profile
      // console.log(user);
      await user.destroy();
      return {
        EM: 'Delete user successfully',
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: 'user not exist',
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong with service',
      EC: 1,
      DT: [],
    };
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
  getUserWithPagination,
};
