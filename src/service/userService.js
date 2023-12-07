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
      groupId: 4,
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
  try {
    const newUser = await db.UserProfile.findOne({
      where: {id: 1},
      include: {model: db.Group},
      raw: true,
    });
    // console.log(newUser);
    const userAccounts = await db.UserProfile.findAll({
      attributes: ['first_name', 'last_name'],
      include: [
        {model: db.User, attributes: ['id', 'email', 'createdAt', 'updatedAt']},
        {model: db.Group, attributes: ['id', 'name', 'description']},
      ], // Include user profiles in the query
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
          {email: email,
            first_name: firstname,
            last_name: lastname},
          {
            where: {
              id: id,
            },
          },
      );
    } else {

    };
  } catch (error) {

  }
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
