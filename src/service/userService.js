/* eslint-disable prefer-const */
import db from '../models/index.js';
import {checkEmailExist, hashUserPassword} from './registerService.js';
import {Op} from 'sequelize';

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
      first_name: data.first_name,
      last_name: data.last_name,
      roleId: data.role,
      userId: userId,
      city: data.city,
      state: data.state,
      gender: data.gender,
      country: data.country,
      contact_number: data.contact_number,
      date_of_birth: data.date_of_birth,
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
        {model: db.Role, attributes: ['id', 'name', 'description']},
      ], // Include user profiles in the query
      order: [['id', 'DESC']],
      // raw: true,
    });

    let rowsObject = rows.map((row) => {
      const userProperties = {
        email: row.User.email,
        id: row.User.id,
        roleId: row.Role.id,
        roleName: row.Role.name,
        roleDescription: row.Role.description,
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

const updateUser = async (data) => {
  try {
    // console.log('check data', data);

    // Find the user's profile by user's ID
    const user = await db.UserProfile.findOne({
      where: {
        userId: data.id,
      },
    });

    // console.log(user);

    if (!data.roleId) {
      return {
        EM: 'empty groupId',
        EC: 1,
        DT: 'group',
      };
    }
    if (user) {
      await user.update(
          {
            first_name: data.first_name,
            last_name: data.last_name,
            groupId: data.groupId,
            gender: data.gender,
            country: data.country,
            city: data.city,
            state: data.state,
            contact_number: data.contact_number,
            date_of_birth: data.date_of_birth,
          },
      );
      return {
        EM: 'Update successfully',
        EC: 0,
        DT: '',
      };
    } else {
      return {
        EM: 'Update failed',
        EC: 2,
        DT: '',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong with the service',
      EC: 1,
      DT: [],
    };
  }
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

const countUser = async () => {
  try {
    let userCount = await db.User.count();
    return {
      EM: `Count ${userCount} user(s)`,
      EC: 0,
      DT: userCount,
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

const countUserPerWeek = async () => {
  try {
    const currentDate = new Date();
    const startOfThisWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    const endOfThisWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6, 23, 59, 59, 999);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(endOfThisWeek);
    endOfLastWeek.setDate(endOfThisWeek.getDate() - 7);

    const usersThisWeek = await db.User.count({
      where: {
        createdAt: {
          [Op.between]: [startOfThisWeek, endOfThisWeek],
        },
      },
    });

    const usersLastWeek = await db.User.count({
      where: {
        createdAt: {
          [Op.between]: [startOfLastWeek, endOfLastWeek],
        },
      },
    });
    // console.log(startOfLastWeek, startOfThisWeek, endOfLastWeek, endOfThisWeek);
    // console.log(`Users this week: ${usersThisWeek}`);
    // console.log(`Users last week: ${usersLastWeek}`);
    const calculatePercentageChange = (oldValue, newValue) => {
      if (oldValue === 0) {
        return newValue === 0 ? 0 : 100; // Handle division by zero
      }

      return ((newValue - oldValue) / oldValue) * 100;
    };
    const percentageChange = calculatePercentageChange(usersLastWeek, usersThisWeek);
    // console.log(percentageChange);
    return {
      EM: `${percentageChange}% increasing in user(s) from lastweek`,
      EC: 0,
      DT: percentageChange,
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
  updateUser,
  getUserWithPagination,
  countUser,
  countUserPerWeek,
};
