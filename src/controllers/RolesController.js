/* eslint-disable prefer-const */
import rolesAPIservice from '../service/rolesAPIservice.js';
const RolesCreateFunc = async (req, res) => {
  try {
    // validate
    let data = await rolesAPIservice.createNewRoles(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

const RolesUpdateFunc = async (req, res) => {
  try {

  } catch (error) {

  }
};

const RolesDeleteFunc = async (req, res) => {
  try {
    let data = await rolesAPIservice.deleteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

const RolesReadFunc = async (req, res) => {
  try {
    let data = await rolesAPIservice.getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

const RolesByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await rolesAPIservice.getRolesByGroup(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};

const AssignRoleToGroup = async (req, res) => {
  try {
    let data = await rolesAPIservice.assignRoleToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from server', // error message
      EC: '-1', // error code (error = -1, success = 0)
      DT: '', // date
    });
  }
};


module.exports = {
  RolesCreateFunc,
  RolesUpdateFunc,
  RolesDeleteFunc,
  RolesReadFunc,
  RolesByGroup,
  AssignRoleToGroup,
};
