/* eslint-disable prefer-const */
import userService from '../service/userService.js';

// Create a new user
const createNewUser = async (req, res) => {
  let data = await userService.createNewUser(req.body);
  // console.log('>>>check req', req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
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
  try {
    return res.status(200).json({
      EM: 'ok',
      EC: 0, // error code
      DT: {
        access_token: req.token,
        rolesWithPermission: req.user.rolesWithPermission,
        email: req.user.email,
        username: req.user.username,
      },
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
const userUpdate = async (req, res) => {
  try {
    // console.log('>>>check req', req.body);
    let data = await userService.updateUser(req.body);
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

const userCount = async (req, res) => {
  try {
    const data = await userService.countUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT, // data
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code
      DT: '', // data
    });
  }
};

const userCountPerWeek = async (req, res) => {
  try {
    const data = await userService.countUserPerWeek();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT, // data
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

module.exports = {
  createNewUser,
  getAllUser,
  getUserAccount,
  userRead,
  userCreate,
  userDelete,
  userUpdate,
  userCount,
  userCountPerWeek,
};
