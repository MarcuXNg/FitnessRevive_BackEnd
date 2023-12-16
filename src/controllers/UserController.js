/* eslint-disable prefer-const */
import userService from '../service/userService.js';

// Create a new user
const createNewUser = async (req, res) => {
  // // Validate request
  // if (!req.body) {
  //   res.status(400).send({
  //     message: 'Content can not be empty!',
  //   });
  // }
  // const email = req.body.email;
  // const password = req.body.password;
  // const firstname = req.body.firstname;
  // const lastname = req.body.lastname;

  // let data = await userService.createNewUser(email, password, firstname, lastname);
  let data = await userService.createNewUser(req.body);
  // console.log('>>>check req', req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};

// Find a single Tutorial by Id
const userById = async (req, res) => {
  const id = req.params.id;
  const user = await userService.userById(id);
  let userData = {};
  if (!user) {
    return res.status(404).send('404 NOT FOUND');
  }
  userData = user;
  // console.log(req.params.id);
  return res.send(userData);
};

// get All User
const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT, // date
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '', // date
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: 'ok',
    EC: 0, // error code
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  });
};

const userRead = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userService.getUserWithPagination(+page, +limit);
      // console.log(page, limit);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, // data
      });
    } else {
      let data = await userService.getAllUser();
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, // data
      });
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '', // data
    });
  }
};
const userCreate = async (req, res) => {
  try {
    let data = await userService.createNewUser(req.body);
    // console.log('>>>check req', req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
const userUpdate = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};
const userDelete = async (req, res) => {
  try {
    // console.log('Backend response:', req.body.id);
    let data = await userService.deleteUser(req.body.id);
    // console.log(data);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT, // data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server',
      EC: '-1',
      DT: '',
    });
  }
};


// // Update a Tutorial identified by the id in the request
// exports.getUpdate = async (req, res) => {
//   // Validate Request
//   const id = req.params.id;
//   const user = await userService.updateUserByID(id);
//   let userData = {};
//   if (user && user.length > 0) {
//     userData = user[0];
//   }
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!',
//     });
//   }
//   console.log(req.body);

//   Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: 'Error updating Tutorial with id ' + req.params.id,
//         });
//       }
//     } else res.send(data);
//   });
// };

module.exports = {
  createNewUser,
  userById,
  getAllUser,
  getUserAccount,
  userRead,
  userCreate,
  userDelete,
  userUpdate,
};
