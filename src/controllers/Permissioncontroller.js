/* eslint-disable prefer-const */
import permissionsAPIservice from '../service/permissionService.js';
const PermissionCreateFunc = async (req, res) => {
  try {
    // validate
    let data = await permissionsAPIservice.createNewPermission(req.body);
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

const PermissionUpdateFunc = async (req, res) => {
  try {

  } catch (error) {

  }
};

const PermisionDeleteFunc = async (req, res) => {
  try {
    let data = await permissionsAPIservice.deletePermission(req.body.id);
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

const PermissionsReadFunc = async (req, res) => {
  try {
    let data = await permissionsAPIservice.getAllPermissions();
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

const PermissionsByRole = async (req, res) => {
  try {
    let id = req.params.roleId;
    let data = await permissionsAPIservice.getPermissionsByRole(id);
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

const AssignPermissionToRole = async (req, res) => {
  try {
    let data = await permissionsAPIservice.assignPermissionToRole(req.body.data);
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
  PermissionCreateFunc,
  PermissionUpdateFunc,
  PermisionDeleteFunc,
  PermissionsReadFunc,
  PermissionsByRole,
  AssignPermissionToRole,
};
